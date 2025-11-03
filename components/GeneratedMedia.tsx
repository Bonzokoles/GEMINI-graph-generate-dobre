
import React from 'react';
import { Download } from 'lucide-react';

interface GeneratedMediaProps {
  url: string;
  type: 'image' | 'video';
  alt: string;
}

export const GeneratedMedia: React.FC<GeneratedMediaProps> = ({ url, type, alt }) => {
  return (
    <div className="mt-4 bg-gray-800 p-2 rounded-lg relative group">
      {type === 'image' ? (
        <img src={url} alt={alt} className="w-full h-auto rounded-md object-contain max-h-[70vh]" />
      ) : (
        <video src={url} controls autoPlay loop className="w-full h-auto rounded-md object-contain max-h-[70vh]" />
      )}
      <a
        href={url}
        download={`generated-${type}-${Date.now()}`}
        className="absolute bottom-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100"
        aria-label="Download media"
      >
        <Download size={20} />
      </a>
    </div>
  );
};

