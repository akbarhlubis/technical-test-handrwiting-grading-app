import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TingXie Hero",
    short_name: "TingXie",
    description: "AI-powered Chinese handwriting grading app",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4efe7",
    theme_color: "#18211e",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
