
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
  const [activeTab, setActiveTab] = useState<FeatureTab>('Image Generation');
  const [veoContext, setVeoContext] = useState<VeoOperationContext | null>(null);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Image Generation':
        return <ImageGenerationTab />;
      case 'Image Editing':
        return <ImageEditingTab />;
      case 'Image Analysis':
        return <ImageAnalysisTab />;
      case 'Video Generation':
        return <VideoGenerationTab setVeoContext={setVeoContext} />;
      case 'Video Continuation':
        return <VideoContinuationTab veoContext={veoContext} setVeoContext={setVeoContext} />;
      default:
        return <ImageGenerationTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderActiveTab()}
      </main>
       <footer className="w-full bg-gray-900/50 backdrop-blur-sm border-t border-purple-500/20 py-4 text-center text-sm text-gray-400">
        <div className="container mx-auto flex justify-center items-center space-x-4">
            <p>Powered by Google Gemini</p>
            <a href="https://github.com/google/generative-ai-docs" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                <Github size={20} />
            </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
