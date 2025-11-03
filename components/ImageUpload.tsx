
import React, { useCallback } from 'react';
import type { UploadedFile } from '../types';
import { UploadCloud, X } from 'lucide-react';
import { fileToBase64 } from '../services/geminiService';

interface ImageUploadProps {
  onFileUpload: (file: UploadedFile) => void;
  uploadedFile: UploadedFile | null;
  setUploadedFile: (file: UploadedFile | null) => void;
  label: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onFileUpload, uploadedFile, setUploadedFile, label }) => {
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const { base64, mimeType } = await fileToBase64(file);
      const uploaded = { base64, mimeType, preview: URL.createObjectURL(file) };
      setUploadedFile(uploaded);
      onFileUpload(uploaded);
    }
  };

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const { base64, mimeType } = await fileToBase64(file);
      const uploaded = { base64, mimeType, preview: URL.createObjectURL(file) };
      setUploadedFile(uploaded);
      onFileUpload(uploaded);
    }
  }, [onFileUpload, setUploadedFile]);

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const clearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    setUploadedFile(null);
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      {uploadedFile ? (
        <div className="relative group">
          <img src={uploadedFile.preview} alt="Preview" className="w-full rounded-lg object-contain max-h-80" />
          <button
            onClick={clearFile}
            className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-black/80 transition-opacity opacity-0 group-hover:opacity-100"
            aria-label="Remove image"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="flex justify-center w-full h-48 px-4 transition bg-gray-800 border-2 border-gray-600 border-dashed rounded-md appearance-none cursor-pointer hover:border-blue-500 focus:outline-none"
        >
          <span className="flex items-center space-x-2">
            <UploadCloud className="text-gray-500" />
            <span className="font-medium text-gray-500">
              Drop an image, or <span className="text-blue-400 underline">browse</span>
            </span>
          </span>
          <input type="file" name="file_upload" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      )}
    </div>
  );
};


