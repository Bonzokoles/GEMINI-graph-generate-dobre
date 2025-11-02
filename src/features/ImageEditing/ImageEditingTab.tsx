import React, { useState } from 'react';
import type { UploadedFile } from '../../types';
import { ImageUpload } from '../../components/ImageUpload';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { editImage } from '../../services/geminiService';
import { BotMessageSquare } from 'lucide-react';

export const ImageEditingTab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !uploadedFile) {
      setError('Please upload an image and enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);
    try {
      const url = await editImage(prompt, uploadedFile);
      setEditedImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUpload
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            onFileUpload={(file) => setUploadedFile(file)}
            label="Upload Image to Edit"
        />
        
        <div>
          <label htmlFor="edit-prompt" className="block text-sm font-medium text-theme-text/80 mb-2">
            Editing Instruction
          </label>
          <textarea
            id="edit-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Change the background to a futuristic city, add a retro filter"
            className="w-full p-3 bg-theme-secondary/50 border-2 border-theme-secondary rounded-theme focus:ring-theme-accent focus:border-theme-accent transition-colors"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !uploadedFile}
          className="w-full flex items-center justify-center bg-theme-accent text-white font-bold py-3 px-4 rounded-theme hover:bg-opacity-90 transition-colors disabled:bg-theme-secondary disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner message="Editing..." /> : <><BotMessageSquare className="mr-2" size={18}/> Edit Image</>}
        </button>
      </form>

      {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-theme">{error}</div>}
      
      {editedImageUrl && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <h3 className="text-lg font-semibold text-center mb-2">Original</h3>
                  <img src={uploadedFile?.preview} alt="Original" className="rounded-theme w-full"/>
              </div>
              <div>
                  <h3 className="text-lg font-semibold text-center mb-2">Edited</h3>
                  <img src={editedImageUrl} alt="Edited" className="rounded-theme w-full"/>
              </div>
          </div>
      )}
    </div>
  );
};