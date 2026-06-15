import React from 'react';

export const FilterPills = ({ options, selected, onChange, nowrap = false }) => {
  return (
    <div className={`flex items-center gap-2 ${nowrap ? 'flex-nowrap shrink-0' : 'flex-wrap'}`}>
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`
              px-4 py-1.5 rounded-full text-sm font-medium transition-colors border
              ${isSelected 
                ? 'bg-[#fff2ee] border-[#ff7a50] text-[#f95724]' 
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
