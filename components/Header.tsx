
import React from 'react';
import type { FeatureTab } from '../types';
import { TabButton } from './TabButton';
import { BotMessageSquare, Clapperboard, Film, Image, ScanSearch } from 'lucide-react';

interface HeaderProps {
  activeTab: FeatureTab;
  setActiveTab: (tab: FeatureTab) => void;
}

const TABS: { name: FeatureTab; icon: React.ElementType }[] = [
  { name: 'Image Generation', icon: Image },
  { name: 'Image Editing', icon: BotMessageSquare },
  { name: 'Image Analysis', icon: ScanSearch },
  { name: 'Video Generation', icon: Clapperboard },
  { name: 'Video Continuation', icon: Film },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg shadow-purple-500/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4 md:mb-0">
            Creative AI Studio
          </h1>
          <nav className="flex flex-wrap justify-center items-center gap-2">
            {TABS.map(({ name, icon: Icon }) => (
              <TabButton
                key={name}
                onClick={() => setActiveTab(name)}
                isActive={activeTab === name}
                icon={<Icon size={16} className="mr-2" />}
              >
                {name}
              </TabButton>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
