export type FeatureTab = 'Image Generation' | 'Image Editing' | 'Image Analysis' | 'Video Generation' | 'Video Continuation';

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
export type VideoAspectRatio = '16:9' | '9:16';

export interface UploadedFile {
  base64: string;
  mimeType: string;
  preview: string;
}

export interface VeoOperationContext {
    operation: any; // GetVideosOperationResponse is not exported from @google/genai
    prompt: string;
}
