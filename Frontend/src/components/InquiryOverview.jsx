import React, { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import AnalyticsCard from './AnalyticsCard';
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
      outerRadius={outerRadius + 6}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

const InquiryOverview = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const onPieEnter = (_, index) => {
    setActiveIndex((prev) => (prev === index ? prev : index));
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const tooltipFormatter = useCallback((val) => `${val} inquiries (${((val / total) * 100).toFixed(0)}%)`, [total]);

  const renderTooltip = useCallback((props) => (
    <ChartTooltip {...props} formatter={tooltipFormatter} />
  ), [tooltipFormatter]);

  return (
    <AnalyticsCard
      title="Inquiry Overview"
      subtitle="Breakdown by inquiry type"
    >
      {total === 0 ? (
        <div className="flex items-center justify-center h-[250px] w-full mt-2">
          <p className="text-[14px] text-gray-500 font-medium">No inquiries available yet.</p>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between h-[250px] w-full mt-2">
          <div className="w-[50%] h-full relative -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart onMouseLeave={onPieLeave}>
                <Tooltip wrapperStyle={{ zIndex: 1000 }} content={renderTooltip} />
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
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
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-[50%] flex flex-col justify-center pl-2">
            <div className="space-y-4">
              {data.map((item, index) => (
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
              <span className="text-base font-bold text-gray-900">{total}</span>
            </div>
          </div>
        </div>
      )}
    </AnalyticsCard>
  );
};

export default InquiryOverview;
