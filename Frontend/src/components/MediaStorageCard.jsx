import React, { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import ChartTooltip from './ChartTooltip';

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      key={`pie-label-${index}`}
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="13"
      fontWeight="bold"
      pointerEvents="none"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 5}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

const MediaStorageCard = ({ mediaBreakdown, totalStorageUsed = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex((prev) => (prev === index ? prev : index));
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const tooltipFormatter = useCallback((val, name, props) => {
    const gb = props?.payload?.bytes ? (props.payload.bytes / (1024 * 1024 * 1024)).toFixed(2) : 0;
    return `${gb} GB (${val}%)`;
  }, []);

  const renderTooltip = useCallback((props) => (
    <ChartTooltip {...props} formatter={tooltipFormatter} />
  ), [tooltipFormatter]);

  const usedStorage = (totalStorageUsed / (1024 * 1024 * 1024)).toFixed(2);
  const totalStorage = 100;

  const rawData = [
    { name: 'Images', bytes: mediaBreakdown?.images || 0, fill: '#f97316' },
    { name: 'Videos', bytes: mediaBreakdown?.videos || 0, fill: '#e11d48' },
    { name: 'Documents', bytes: mediaBreakdown?.documents || 0, fill: '#6366f1' },
    { name: '3D Models', bytes: mediaBreakdown?.models || 0, fill: '#10b981' },
  ];

  const totalBytes = rawData.reduce((acc, curr) => acc + curr.bytes, 0);

  let mediaStorageData = rawData.map(item => ({
    name: item.name,
    value: totalBytes > 0 ? Number(((item.bytes / totalBytes) * 100).toFixed(0)) : 0,
    bytes: item.bytes,
    fill: item.fill
  }));

  if (totalBytes === 0) {
    mediaStorageData = [{ name: 'Empty', value: 100, fill: '#e5e7eb' }];
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-[15px] font-semibold text-gray-900">Media Storage Usage</h3>
        <p className="text-[13px] text-gray-500 mt-1">{usedStorage} GB / {totalStorage} GB used</p>
      </div>

      <div className="flex flex-row items-center justify-between mt-2 flex-grow">
        <div className="w-[45%] h-[180px] relative -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart onMouseLeave={onPieLeave}>
              <Tooltip wrapperStyle={{ zIndex: 1000 }} content={renderTooltip} />
              <Pie
                data={mediaStorageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                isAnimationActive={true}
                labelLine={false}
                label={renderCustomizedLabel}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
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
          {totalBytes === 0 ? (
            <div className="text-[13px] text-gray-500">No media files uploaded yet.</div>
          ) : (
            rawData.map((item, index) => {
              const percentage = totalBytes > 0 ? Number(((item.bytes / totalBytes) * 100).toFixed(0)) : 0;
              return (
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
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1">
                    <div
                      className="h-1 rounded-full"
                      style={{ width: `${percentage}%`, backgroundColor: item.fill }}
                    ></div>
                  </div>
                </div>
              );
            })
          )}

          <div className="mt-4 pt-4 border-t border-gray-50">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[13px] text-gray-500">Total Storage</span>
              <span className="text-[13px] font-bold text-gray-900">{usedStorage} / {totalStorage} GB</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-orange-500"
                style={{ width: `${(usedStorage / totalStorage) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaStorageCard;
