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
      setError('Proszę wpisać opis obrazu.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);
    try {
      const url = await generateImage(prompt, aspectRatio);
      setGeneratedImageUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-theme-text/80 mb-2">
            Wpisz opis obrazu
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="np., Majestatyczny smok latający nad górami o zachodzie słońca"
            className="w-full p-3 bg-theme-secondary/50 border-2 border-theme-secondary rounded-theme focus:ring-theme-accent focus:border-theme-accent transition-colors"
            rows={3}
          />
        </div>

        <AspectRatioSelector<AspectRatio>
          value={aspectRatio}
          onChange={setAspectRatio}
          options={['1:1', '16:9', '9:16', '4:3', '3:4']}
          label="Proporcje obrazu"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-theme-accent text-white font-bold py-3 px-4 rounded-theme hover:bg-opacity-90 transition-colors disabled:bg-theme-secondary disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner message="Generowanie..." /> : <><Wand2 className="mr-2" size={18} /> Generuj Obraz</>}
        </button>
      </form>

      {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-theme">{error}</div>}

      {generatedImageUrl && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-center mb-4">Wygenerowany Obraz</h3>
          <GeneratedMedia url={generatedImageUrl} type="image" alt={prompt} />
        </div>
      )}
    </div>
  );
};
