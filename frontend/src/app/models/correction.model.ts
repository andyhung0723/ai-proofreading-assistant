export interface DiffChange {
  value: string;
  added?: boolean;
  removed?: boolean;
}

export type AppStatus = 'input' | 'correcting' | 'review' | 'translated';

export interface FixTextRequest {
  text: string;
  customInstruction?: string;
}

export interface FixTextResponse {
  originalText: string;
  correctedText: string;
}

export interface TranslateTextRequest {
  finalText: string;
}

export interface TranslateTextResponse {
  translatedText: string;
}
