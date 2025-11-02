import React from 'react';

interface TabButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({ onClick, isActive, children, icon }) => {
  const baseClasses =
    'flex items-center justify-center px-3 py-2 text-sm font-medium rounded-theme transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-theme-primary focus-visible:ring-theme-accent';
  const activeClasses = 'bg-theme-accent text-white shadow-md shadow-theme-shadow/20';
  const inactiveClasses = 'bg-theme-secondary/50 text-theme-text/80 hover:bg-theme-secondary hover:text-theme-text';

  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      {children}
    </button>
  );
};