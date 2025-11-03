import React from 'react';
import type { FeatureTab } from '../types';
import { TabButton } from './TabButton';
import { BotMessageSquare, Clapperboard, Film, Image, ScanSearch } from 'lucide-react';

interface HeaderProps {
  activeTab: FeatureTab;
  setActiveTab: (tab: FeatureTab) => void;
  children: React.ReactNode;
}

const TABS: { name: FeatureTab; icon: React.ElementType }[] = [
  { name: 'Image Generation', icon: Image },
  { name: 'Image Editing', icon: BotMessageSquare },
  { name: 'Image Analysis', icon: ScanSearch },
  { name: 'Video Generation', icon: Clapperboard },
  { name: 'Video Continuation', icon: Film },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <header className="sticky top-0 z-50 bg-theme-primary/80 backdrop-blur-md shadow-lg shadow-theme-shadow/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-theme-accent to-theme-accent-alt mb-4 md:mb-0">
            Creative AI Studio
          </h1>
          <div className="flex items-center gap-4">
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
            <div className="hidden md:block">
                {children}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
