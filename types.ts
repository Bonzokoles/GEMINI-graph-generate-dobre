
import type { GetVideosOperationResponse } from '@google/genai';

export type FeatureTab = 'Generowanie Obrazów' | 'Edycja Obrazów' | 'Analiza Obrazów' | 'Generowanie Video' | 'Kontynuacja Video';

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
export type VideoAspectRatio = '16:9' | '9:16';

export interface UploadedFile {
  base64: string;
  mimeType: string;
  preview: string;
}

export interface VeoOperationContext {
    operation: GetVideosOperationResponse;
    prompt: string;
}


