import React from 'react';
import { KeyRound, ExternalLink } from 'lucide-react';

interface ApiKeySelectorProps {
  isChecking: boolean;
  onSelectKey: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ isChecking, onSelectKey }) => {
  return (
    <div className="bg-theme-secondary/50 border border-theme-accent/30 rounded-theme p-6 flex flex-col items-center text-center">
      <KeyRound className="w-12 h-12 text-theme-accent-alt mb-4" />
      <h3 className="text-xl font-bold mb-2">API Key Required</h3>
      <p className="text-theme-text/80 mb-4">
        Video generation with Veo requires you to select your own API key. This usage may be subject to billing.
      </p>
      <a 
        href="https://ai.google.dev/gemini-api/docs/billing" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center text-sm text-theme-accent-alt hover:underline mb-6"
      >
        Learn more about billing <ExternalLink className="w-4 h-4 ml-1" />
      </a>
      <button
        onClick={onSelectKey}
        disabled={isChecking}
        className="w-full bg-theme-accent text-white font-bold py-2 px-4 rounded-theme hover:bg-opacity-90 transition-colors disabled:bg-theme-secondary disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isChecking ? 'Checking...' : 'Select API Key'}
      </button>
    </div>
  );
};