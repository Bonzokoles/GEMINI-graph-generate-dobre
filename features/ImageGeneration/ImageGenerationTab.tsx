
import React, { useState } from 'react';
import type { AspectRatio } from '../../types';
import { AspectRatioSelector } from '../../components/AspectRatioSelector';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GeneratedMedia } from '../../components/GeneratedMedia';
import { generateImage } from '../../services/geminiService';
import { Wand2 } from 'lucide-react';

export const ImageGenerationTab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    try {
      const url = await generateImage(prompt, aspectRatio);
      setGeneratedImageUrl(url);
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
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A cinematic shot of a raccoon in a library, surrounded by glowing books"
            className="w-full p-3 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows={3}
          />
        </div>

        <AspectRatioSelector<AspectRatio>
          value={aspectRatio}
          onChange={setAspectRatio}
          options={['1:1', '16:9', '9:16', '4:3', '3:4']}
          label="Aspect Ratio"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner message="Generating..." /> : <><Wand2 className="mr-2" size={18} /> Generate Image</>}
        </button>
      </form>

      {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
      
      {generatedImageUrl && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-center mb-4">Generated Image</h3>
            <GeneratedMedia url={generatedImageUrl} type="image" alt={prompt} />
          </div>
      )}
    </div>
  );
};

