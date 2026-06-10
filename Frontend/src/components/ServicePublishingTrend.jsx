import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { servicePublishingData } from './dashboardChartData';
import AnalyticsCard from './AnalyticsCard';

const ServicePublishingTrend = () => {
  const legend = (
    <>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-[#f97316] mr-2"></div>
        <span>Published</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-[#e5e7eb] mr-2"></div>
        <span>Draft</span>
      </div>
    </>
  );

  return (
    <AnalyticsCard 
      title="Service Publishing Trend" 
      subtitle="Published vs Draft services — last 6 months"
      legend={legend}
    >
      <div className="h-[250px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={servicePublishingData}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            barSize={24}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#f97316', fontSize: 13, fontWeight: 600 }}
              ticks={[0, 4, 8, 12, 16]}
            />
            <Bar dataKey="published" fill="#f97316" radius={[4, 4, 0, 0]} />
            <Bar dataKey="draft" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnalyticsCard>
  );
};

export default ServicePublishingTrend;
