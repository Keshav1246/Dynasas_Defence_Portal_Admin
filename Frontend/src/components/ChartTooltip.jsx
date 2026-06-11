import React from 'react';

const ChartTooltip = ({ active, payload, label, formatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white p-3 rounded-xl shadow-lg border border-gray-800 text-[13px] min-w-[120px] z-50 pointer-events-none">
        {label && <p className="font-medium mb-1.5 text-gray-300">{label}</p>}
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5">
                {entry.color && (
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: entry.payload?.fill || entry.color }}
                  />
                )}
                <span className="text-gray-300">{entry.name}:</span>
              </span>
              <span className="font-bold text-white">
                {formatter ? formatter(entry.value, entry.name, entry.payload) : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default ChartTooltip;
