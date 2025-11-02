import { GoogleGenAI } from "@google/genai";
import type { AspectRatio, UploadedFile, VideoAspectRatio } from '../types';

export const fileToBase64 = (file: File): Promise<{ base64: string, mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = (error) => reject(error);
  });
};

const getGenAI = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

// --- IMAGE SERVICES ---

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  const ai = getGenAI();
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio,
    },
  });

  const base64ImageBytes = response.generatedImages[0].image.imageBytes;
  return `data:image/jpeg;base64,${base64ImageBytes}`;
};

export const editImage = async (prompt: string, image: UploadedFile): Promise<string> => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: image.base64,
            mimeType: image.mimeType,
          },
        },
        { text: prompt },
      ],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64ImageBytes = part.inlineData.data;
      return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
    }
  }
  throw new Error("No image generated in response.");
};


export const analyzeImage = async (image: UploadedFile): Promise<string> => {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        {
          inlineData: {
            data: image.base64,
            mimeType: image.mimeType,
          },
        },
        { text: "Describe this image in detail. What is happening? What are the key objects and subjects? What is the overall mood or style?" },
      ],
    },
  });

  return response.text;
};

// --- VIDEO SERVICES ---

export const generateVideo = async (prompt: string, aspectRatio: VideoAspectRatio, image?: UploadedFile) => {
  const ai = getGenAI(); // Re-create instance to get latest key
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    image: image ? { imageBytes: image.base64, mimeType: image.mimeType } : undefined,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio,
    },
  });
  return operation;
};

export const extendVideo = async (prompt: string, previousOperation: any) => {
    const ai = getGenAI();
    const video = previousOperation.response?.generatedVideos?.[0]?.video;
    if (!video) throw new Error("Previous video data not found.");

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-generate-preview',
        prompt,
        video,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: video.aspectRatio,
        },
    });
    return operation;
};


export const pollVideoOperation = async (operation: any) => {
    const ai = getGenAI();
    let currentOperation = operation;
    while (!currentOperation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
        currentOperation = await ai.operations.getVideosOperation({ operation: currentOperation });
    }
    return currentOperation;
};

export const getVideoUrl = async (uri: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const response = await fetch(`${uri}&key=${process.env.API_KEY}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
};