import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { inquiryOverviewData } from './dashboardChartData';
import AnalyticsCard from './AnalyticsCard';

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

const InquiryOverview = () => {
  return (
    <AnalyticsCard 
      title="Inquiry Overview" 
      subtitle="Breakdown by inquiry type"
    >
      <div className="flex flex-row items-center justify-between h-[250px] w-full mt-2">
        <div className="w-[50%] h-full relative -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={inquiryOverviewData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {inquiryOverviewData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-[50%] flex flex-col justify-center pl-2">
          <div className="space-y-4">
            {inquiryOverviewData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-2 h-2 rounded-full mr-3" 
                    style={{ backgroundColor: item.fill }}
                  ></div>
                  <span className="text-[13px] text-gray-500">{item.name}</span>
                </div>
                <span 
                  className="text-[13px] font-bold"
                  style={{ color: item.fill }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-5 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[13px] text-gray-400">Total</span>
            <span className="text-base font-bold text-gray-900">100</span>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  );
};

export default InquiryOverview;
