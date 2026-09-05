"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import GradingResult from "@/components/grading/grading-result";
import type {
  UploadErrorResponse,
  UploadSuccessResponse,
} from "@/components/grading/types";

type CameraState = "initializing" | "active" | "denied" | "unavailable" | "captured";
type GradingState = "idle" | "submitting" | "result" | "error";

const STUDENT_ID = "lucas-primary-2";

type TorchTrack = MediaStreamTrack & {
  getCapabilities?: () => MediaTrackCapabilities & { torch?: boolean };
};

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

function getCameraErrorState(error: unknown): Exclude<CameraState, "initializing" | "active" | "captured"> {
  if (
    error instanceof DOMException &&
    (error.name === "NotAllowedError" || error.name === "SecurityError")
  ) {
    return "denied";
  }

  return "unavailable";
}

function isUploadErrorResponse(value: unknown): value is UploadErrorResponse {
  if (typeof value !== "object" || value === null || !("error" in value)) {
    return false;
  }

  const error = value.error;
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  );
}

function isUploadSuccessResponse(value: unknown): value is UploadSuccessResponse {
  if (typeof value !== "object" || value === null || !("submission" in value) || !("results" in value)) {
    return false;
  }

  const submission = value.submission;
  return (
    typeof submission === "object" &&
    submission !== null &&
    "score" in submission &&
    typeof submission.score === "number" &&
    Array.isArray(value.results)
  );
}

export default function HandwritingCamera({ lessonId }: { lessonId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>("initializing");
  const [capturedBlob, setCapturedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [torchSupported, setTorchSupported] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [gradingState, setGradingState] = useState<GradingState>("idle");
  const [gradingResponse, setGradingResponse] = useState<UploadSuccessResponse | null>(null);
  const [gradingError, setGradingError] = useState<UploadErrorResponse["error"] | null>(null);

  const startCamera = useCallback(async () => {
    stopStream(streamRef.current);
    streamRef.current = null;
    setTorchEnabled(false);
    setCameraState("initializing");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraState("unavailable");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;

      const track = stream.getVideoTracks()[0] as TorchTrack | undefined;
      const capabilities = track?.getCapabilities?.() as
        | (MediaTrackCapabilities & { torch?: boolean })
        | undefined;
      setTorchSupported(capabilities?.torch === true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraState("active");
    } catch (error) {
      stopStream(streamRef.current);
      streamRef.current = null;
      setTorchSupported(false);
      setCameraState(getCameraErrorState(error));
    }
  }, []);

  useEffect(() => {
    const startupTimer = window.setTimeout(() => void startCamera(), 0);

    return () => {
      window.clearTimeout(startupTimer);
      stopStream(streamRef.current);
      streamRef.current = null;
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, [startCamera]);

  async function toggleTorch() {
    const track = streamRef.current?.getVideoTracks()[0] as TorchTrack | undefined;
    if (!track || !torchSupported) {
      return;
    }

    const nextTorchState = !torchEnabled;
    try {
      await track.applyConstraints({
        advanced: [{ torch: nextTorchState } as MediaTrackConstraintSet],
      });
      setTorchEnabled(nextTorchState);
    } catch {
      setTorchEnabled(false);
    }
  }

  function captureFrame() {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }

      stopStream(streamRef.current);
      streamRef.current = null;
      const objectUrl = URL.createObjectURL(blob);
      previewUrlRef.current = objectUrl;
      setPreviewUrl(objectUrl);
      setCapturedBlob(blob);
      setCameraState("captured");
    }, "image/jpeg", 0.92);
  }

  function retake() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);
    setCapturedBlob(null);
    setGradingState("idle");
    setGradingResponse(null);
    setGradingError(null);
    void startCamera();
  }

  async function submitGrading() {
    if (!capturedBlob || gradingState === "submitting") {
      return;
    }

    setGradingState("submitting");
    setGradingError(null);

    const formData = new FormData();
    formData.append("image", capturedBlob, "handwriting.jpg");
    formData.append("lessonId", lessonId);
    formData.append("studentId", STUDENT_ID);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const body: unknown = await response.json();

      if (!response.ok) {
        if (isUploadErrorResponse(body)) {
          setGradingError(body.error);
        } else {
          setGradingError({ message: "We couldn't grade your handwriting. Please try again." });
        }
        setGradingState("error");
        return;
      }

      if (!isUploadSuccessResponse(body)) {
        throw new Error("Invalid grading response.");
      }

      setGradingResponse(body);
      setGradingState("result");
    } catch {
      setGradingError({ message: "We couldn't grade your handwriting. Please try again." });
      setGradingState("error");
    }
  }

  if (cameraState === "captured" && gradingState === "result" && gradingResponse && previewUrl) {
    return (
      <GradingResult
        imageUrl={previewUrl}
        score={gradingResponse.submission.score}
        results={gradingResponse.results}
        onRetake={retake}
      />
    );
  }

  if (cameraState === "captured" && capturedBlob && previewUrl) {
    return (
      <main className="min-h-screen bg-[#f4efe7] px-5 py-8 text-[#1f2925] sm:px-10">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#b5573d]">
            Camera capture
          </p>
          <h1 className="font-serif text-4xl leading-tight sm:text-6xl">Review your page</h1>
          <p className="mt-4 max-w-lg text-[#53605a]">
            {gradingState === "submitting"
              ? "Keep this page open while we grade your handwriting."
              : "Your high-resolution handwriting capture is ready. Retake it if the page is not flat or fully inside the frame."}
          </p>
          <div className="mt-8 overflow-hidden rounded-[2rem] border-8 border-white bg-[#d8d1c5] shadow-[0_24px_70px_rgba(49,42,31,0.18)]">
            <img src={previewUrl} alt="Captured handwriting page" className="h-auto w-full" />
          </div>
          {gradingState === "submitting" && (
            <div className="mt-6 rounded-2xl bg-[#1f2925] px-5 py-4 text-center text-sm text-white">
              Grading your handwriting...
            </div>
          )}
          {gradingState === "error" && gradingError && (
            <div className="mt-6 rounded-2xl border border-[#d7a08e] bg-[#fff7f1] px-5 py-4 text-sm text-[#8f382f]">
              <p>{gradingError.message}</p>
              {gradingError.retryable && (
                <p className="mt-2 text-xs text-[#53605a]">
                  Your submission was saved. Retake the page to start a new grading attempt.
                </p>
              )}
            </div>
          )}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={retake}
              disabled={gradingState === "submitting"}
              className="w-full rounded-full border border-[#1f2925] px-6 py-4 text-sm font-semibold text-[#1f2925] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Retake image
            </button>
            <button
              type="button"
              onClick={gradingState === "error" ? retake : () => void submitGrading()}
              disabled={gradingState === "submitting"}
              className="w-full rounded-full bg-[#1f2925] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#35443d] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {gradingState === "error" ? "Retake and try again" : "Grade handwriting"}
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (cameraState === "denied" || cameraState === "unavailable") {
    const denied = cameraState === "denied";
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4efe7] px-6 text-center text-[#1f2925]">
        <section className="max-w-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f2d8c9] text-2xl">
            !
          </div>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-[#b5573d]">
            Camera unavailable
          </p>
          <h1 className="mt-3 font-serif text-4xl">We need your camera</h1>
          <p className="mt-4 leading-7 text-[#53605a]">
            {denied
              ? "Camera access is needed to capture your handwriting."
              : "We couldn't access your camera. Please check your device or browser settings."}
          </p>
          <button
            type="button"
            onClick={() => void startCamera()}
            className="mt-8 rounded-full bg-[#1f2925] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#35443d]"
          >
            Try camera again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#18211e] text-white">
      <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(218,177,105,0.17),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.62))]" />
        <header className="relative z-10 flex items-center justify-between px-5 py-6 sm:px-10">
          <Link href="/" className="font-serif text-2xl tracking-tight">
            TingXie <span className="text-[#e3b56f]">HERO</span>
          </Link>
          <span className="rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Practice 01
          </span>
        </header>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-5 pb-8 sm:px-10">
          <div className="mb-8 max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#e3b56f]">
              {cameraState === "initializing" ? "Opening camera" : "Capture handwriting"}
            </p>
            <h1 className="font-serif text-4xl leading-[1.05] sm:text-6xl">
              Keep your page flat and within the frame.
            </h1>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/15 bg-[#27312d] shadow-2xl sm:aspect-[16/10]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              aria-label="Live handwriting camera preview"
              className={`h-full w-full object-cover ${cameraState === "initializing" ? "opacity-0" : "opacity-100"}`}
            />
            {cameraState === "initializing" && (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
                Requesting camera access...
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8 sm:p-16">
              <div className="relative h-[72%] w-full max-w-2xl border border-white/20">
                <span className="absolute -left-px -top-px h-12 w-12 border-l-4 border-t-4 border-[#e3b56f]" />
                <span className="absolute -right-px -top-px h-12 w-12 border-r-4 border-t-4 border-[#e3b56f]" />
                <span className="absolute -bottom-px -left-px h-12 w-12 border-b-4 border-l-4 border-[#e3b56f]" />
                <span className="absolute -bottom-px -right-px h-12 w-12 border-b-4 border-r-4 border-[#e3b56f]" />
                <p className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75">
                  Writing area
                </p>
                <div className="absolute bottom-5 right-5 h-12 w-12 border border-white/70 p-1.5">
                  <div className="grid h-full grid-cols-3 gap-0.5 opacity-80">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <span key={index} className={index % 2 === 0 ? "bg-white" : "bg-transparent"} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => void toggleTorch()}
              disabled={!torchSupported || cameraState !== "active"}
              aria-label={torchSupported ? "Toggle flash" : "Flash unavailable"}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-xl text-white/80 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              {torchEnabled ? "☀" : "◐"}
            </button>
            <button
              type="button"
              onClick={captureFrame}
              disabled={cameraState !== "active"}
              aria-label="Capture handwriting"
              className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/90 shadow-[0_0_0_7px_rgba(255,255,255,0.16)] transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span className="h-14 w-14 rounded-full bg-[#e3b56f]" />
            </button>
            <div className="h-12 w-12" aria-hidden="true" />
          </div>
        </div>
      </section>
    </main>
  );
}
