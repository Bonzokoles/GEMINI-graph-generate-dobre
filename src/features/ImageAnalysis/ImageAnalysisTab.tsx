import React, { useState } from 'react';
import type { UploadedFile } from '../../types';
import { ImageUpload } from '../../components/ImageUpload';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { analyzeImage } from '../../services/geminiService';
import { ScanSearch } from 'lucide-react';

export const ImageAnalysisTab: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      setError('Please upload an image to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeImage(uploadedFile);
      setAnalysis(result);
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
            label="Upload Image to Analyze"
        />

        <button
          type="submit"
          disabled={isLoading || !uploadedFile}
          className="w-full flex items-center justify-center bg-theme-accent text-white font-bold py-3 px-4 rounded-theme hover:bg-opacity-90 transition-colors disabled:bg-theme-secondary disabled:cursor-not-allowed"
        >
          {isLoading ? <LoadingSpinner message="Analyzing..." /> : <><ScanSearch className="mr-2" size={18}/> Analyze Image</>}
        </button>
      </form>

      {error && <div className="mt-4 text-center text-red-400 bg-red-900/50 p-3 rounded-theme">{error}</div>}
      
      {analysis && (
          <div className="mt-8 p-4 bg-theme-secondary/50 rounded-theme">
              <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
              <p className="text-theme-text/90 whitespace-pre-wrap">{analysis}</p>
          </div>
      )}
    </div>
  );
};