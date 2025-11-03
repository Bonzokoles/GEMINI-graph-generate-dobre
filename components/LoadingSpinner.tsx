
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-gray-400">
      <Loader className="animate-spin h-8 w-8 text-blue-500" />
      {message && <p className="text-sm">{message}</p>}
    </div>
  );
};

