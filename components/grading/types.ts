export type CharacterResult = {
  characterName: string;
  recognizedText: string | null;
  isCorrect: boolean;
};

export type UploadSuccessResponse = {
  submission: {
    id: string;
    studentId: string;
    lessonId: string;
    imagePath: string;
    score: number;
  };
  results: CharacterResult[];
};

export type UploadErrorResponse = {
  error: {
    code?: string;
    message: string;
    retryable?: boolean;
  };
  submissionId?: string;
};
