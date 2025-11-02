import React from 'react';

interface AspectRatioSelectorProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: T[];
  label: string;
}

export const AspectRatioSelector = <T extends string>({ value, onChange, options, label }: AspectRatioSelectorProps<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium text-theme-text/80 mb-2">{label}</label>
      <div className="grid grid-cols-5 gap-2">
        {options.map((ratio) => (
          <button
            key={ratio}
            type="button"
            onClick={() => onChange(ratio)}
            className={`px-3 py-2 text-xs font-semibold rounded-theme transition-colors ${
              value === ratio ? 'bg-theme-accent text-white' : 'bg-theme-secondary hover:bg-theme-secondary/80'
            }`}
          >
            {ratio}
          </button>
        ))}
      </div>
    </div>
  );
};