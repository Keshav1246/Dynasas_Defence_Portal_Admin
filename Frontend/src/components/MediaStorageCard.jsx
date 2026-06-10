import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { mediaStorageData, totalStorage, usedStorage } from '../data/mediaStorageData';

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central" 
      fontSize="13" 
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const MediaStorageCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-gray-900">Media Storage Usage</h3>
        <p className="text-[13px] text-gray-500 mt-1">{usedStorage} GB / {totalStorage} GB used</p>
      </div>

      <div className="flex flex-row items-center justify-between mt-2 flex-grow">
        <div className="w-[45%] h-[180px] relative -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mediaStorageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {mediaStorageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-gray-900">{usedStorage}</span>
            <span className="text-[10px] text-gray-400 font-medium">GB used</span>
          </div>
        </div>
        
        <div className="w-[55%] flex flex-col justify-center pl-4 space-y-4">
          {mediaStorageData.map((item, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center">
                  <div 
                    className="w-2 h-2 rounded-full mr-2" 
                    style={{ backgroundColor: item.fill }}
                  ></div>
                  <span className="text-[13px] text-gray-600">{item.name}</span>
                </div>
                <span 
                  className="text-[13px] font-bold"
                  style={{ color: item.fill }}
                >
                  {item.value}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div 
                  className="h-1 rounded-full" 
                  style={{ width: `${item.value}%`, backgroundColor: item.fill }}
                ></div>
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-gray-50">
             <div className="flex justify-between items-center mb-1.5">
               <span className="text-[13px] text-gray-500">Total Storage</span>
               <span className="text-[13px] font-bold text-gray-900">{usedStorage} / {totalStorage} GB</span>
             </div>
             <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full bg-orange-500" 
                  style={{ width: `${(usedStorage/totalStorage)*100}%` }}
                ></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaStorageCard;
