
import React from 'react';
import { KeyRound, ExternalLink } from 'lucide-react';

interface ApiKeySelectorProps {
  isChecking: boolean;
  onSelectKey: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ isChecking, onSelectKey }) => {
  return (
    <div className="bg-gray-800/50 border border-purple-500/30 rounded-lg p-6 flex flex-col items-center text-center">
      <KeyRound className="w-12 h-12 text-purple-400 mb-4" />
      <h3 className="text-xl font-bold mb-2">API Key Required</h3>
      <p className="text-gray-400 mb-4">
        Video generation with Veo requires you to select your own API key. This usage may be subject to billing.
      </p>
      <a 
        href="https://ai.google.dev/gemini-api/docs/billing" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center text-sm text-purple-400 hover:underline mb-6"
      >
        Learn more about billing <ExternalLink className="w-4 h-4 ml-1" />
      </a>
      <button
        onClick={onSelectKey}
        disabled={isChecking}
        className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isChecking ? 'Checking...' : 'Select API Key'}
      </button>
    </div>
  );
};
