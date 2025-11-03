
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageGenerationTab } from './features/ImageGeneration/ImageGenerationTab';
import { ImageEditingTab } from './features/ImageEditing/ImageEditingTab';
import { ImageAnalysisTab } from './features/ImageAnalysis/ImageAnalysisTab';
import { VideoGenerationTab } from './features/VideoGeneration/VideoGenerationTab';
import { VideoContinuationTab } from './features/VideoContinuation/VideoContinuationTab';
import type { FeatureTab, VeoOperationContext } from './types';
import { Github } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeatureTab>('Generowanie Obrazów');
  const [veoContext, setVeoContext] = useState<VeoOperationContext | null>(null);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Generowanie Obrazów':
        return <ImageGenerationTab />;
      case 'Edycja Obrazów':
        return <ImageEditingTab />;
      case 'Analiza Obrazów':
        return <ImageAnalysisTab />;
      case 'Generowanie Video':
        return <VideoGenerationTab setVeoContext={setVeoContext} />;
      case 'Kontynuacja Video':
        return <VideoContinuationTab veoContext={veoContext} setVeoContext={setVeoContext} />;
      default:
        return <ImageGenerationTab />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow container mx-auto p-4 md:p-8"><div className="border-2 border-blue-500/70 rounded-lg p-6 bg-gradient-to-br from-black via-gray-950 to-black shadow-lg shadow-blue-500/20">
        {renderActiveTab()}</div>
      </main>
       <footer className="w-full bg-black/50 backdrop-blur-sm border-t border-blue-500/60 py-4 text-center text-sm text-gray-400">
        <div className="container mx-auto flex justify-center items-center space-x-4">
            <p>Napêdzane przez Google Gemini</p>
            <a href="https://github.com/google/generative-ai-docs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                <Github size={20} />
            </a>
        </div>
      </footer>
    </div>
  );
};

export default App;





