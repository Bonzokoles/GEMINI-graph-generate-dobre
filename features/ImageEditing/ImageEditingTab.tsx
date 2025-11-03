
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
  const [EdytowanyImageUrl, setEdytowanyImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !uploadedFile) {
      setError('Proszê przes³aæ obraz and enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEdytowanyImageUrl(null);
    try {
      const url = await editImage(prompt, uploadedFile);
      setEdytowanyImageUrl(url);
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
            label="Przeœlij Obraz do Edycji"
        />
        
        <div>
          <label htmlFor="edit-prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Editing Instruction
          </label>
          <textarea
            id="edit-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="np., Change the background to a futuristic city, add a retro filter"
            className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !uploadedFile}
          className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner message="Editing..." /> : <><BotMessageSquare className="mr-2" size={18}/> Edytuj Obraz</>}
        </button>
      </form>

      {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
      
      {EdytowanyImageUrl && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                  <h3 className="text-lg font-semibold text-center mb-2">Oryginalny</h3>
                  <img src={uploadedFile?.preview} alt="Oryginalny" className="rounded-lg w-full"/>
              </div>
              <div>
                  <h3 className="text-lg font-semibold text-center mb-2">Edytowany</h3>
                  <img src={EdytowanyImageUrl} alt="Edytowany" className="rounded-lg w-full"/>
              </div>
          </div>
      )}
    </div>
  );
};


