import React, { useState, useEffect, useCallback, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { FilterPills } from '../components/ui/FilterPills';
import { Eye, Users, Clock, MousePointerClick, Download, FileText, FileSpreadsheet } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  BarChart, Bar
} from 'recharts';
import { fetchOverview, fetchTraffic, fetchLeads, triggerExport } from '../api/analyticsApi';

const TIME_FILTERS = ['7D', '30D', '90D', '1Y'];
const EXPORT_OPTIONS = [
  { label: 'Export as CSV', format: 'csv', icon: FileText },
  { label: 'Export as Excel', format: 'xlsx', icon: FileSpreadsheet },
  { label: 'Export as PDF', format: 'pdf', icon: FileText },
];

const StatCard = ({ title, value, growth, growthType, icon: Icon, iconColorClass, bgClass }) => (
  <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-5 flex flex-col justify-between transition-transform hover:-translate-y-0.5">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${iconColorClass}`} />
      </div>
      <div className={`px-2 py-1 rounded text-xs font-bold ${
        growthType === 'positive' ? 'bg-[#eefcf3] text-[#10b981]' : 'bg-[#ffe4e6] text-[#e11d48]'
      }`}>
        {growth > 0 ? '+' : ''}{growth}%
      </div>
    </div>
    <div>
      <h3 className="text-[24px] font-extrabold text-gray-900 leading-none">{value}</h3>
      <p className="text-[13px] font-semibold text-gray-500 mt-1">{title}</p>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 rounded-xl p-3 shadow-xl border border-gray-800">
        <p className="text-gray-300 text-xs font-bold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 mb-1 last:mb-0">
            <span className="text-[12px]" style={{ color: entry.color }}>
              {entry.name}: <span className="font-bold text-white">{entry.value.toLocaleString()}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex items-center justify-end gap-6 text-[12px] font-bold text-gray-500 pb-2">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const Analytics = () => {
  const [filter, setFilter] = useState('30D');
  const [overview, setOverview] = useState(null);
  const [trafficData, setTrafficData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  // Cache data to avoid refetching
  const cache = useRef({});

  const loadData = useCallback(async (currentFilter) => {
    setLoading(true);
    try {
      if (cache.current[currentFilter]) {
        setOverview(cache.current[currentFilter].overview);
        setTrafficData(cache.current[currentFilter].traffic);
        setLeadsData(cache.current.leads); // Leads is 12M, independent of filter
        setLoading(false);
        return;
      }

      const [overviewRes, trafficRes, leadsRes] = await Promise.all([
        fetchOverview(currentFilter),
        fetchTraffic(currentFilter),
        !cache.current.leads ? fetchLeads() : Promise.resolve({ data: cache.current.leads })
      ]);

      const newOverview = overviewRes.data;
      const newTraffic = trafficRes.data;
      const newLeads = leadsRes.data;

      cache.current[currentFilter] = { overview: newOverview, traffic: newTraffic };
      if (!cache.current.leads) cache.current.leads = newLeads;

      setOverview(newOverview);
      setTrafficData(newTraffic);
      setLeadsData(newLeads);
      setError(null);
    } catch (error) {
      console.error('Failed to load analytics:', error);
      setError(error.message || 'Failed to load analytics data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(filter); }, [filter, loadData]);

  const handleExport = async (format) => {
    setExportMenuOpen(false);
    setIsExporting(true);
    try {
      await triggerExport(format, filter);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="flex-1 flex flex-col h-full relative w-full">
      <div className="flex items-center justify-between mb-8 max-lg:flex-col max-lg:items-start max-lg:gap-4">
        <PageHeader 
          title="Analytics" 
          subtitle="Monitor portal performance and user engagement."
        />
        
        <div className="flex items-center gap-4 flex-nowrap shrink-0 max-lg:w-full max-lg:justify-between max-lg:overflow-x-auto max-lg:pb-1 no-scrollbar">
          <FilterPills options={TIME_FILTERS} selected={filter} onChange={setFilter} nowrap={true} />
          
          <div className="relative shrink-0">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 bg-[#f95724] hover:bg-[#e04e20] text-white text-sm font-bold rounded-full transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              {isExporting ? 'Exporting...' : 'Export Report'}
            </button>
            
            {exportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-10 py-1">
                {EXPORT_OPTIONS.map(opt => (
                  <button
                    key={opt.format}
                    onClick={() => handleExport(opt.format)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    <opt.icon className="w-4 h-4 text-gray-400" />
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {loading && !overview && !error ? (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">Loading analytics data...</div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
          <div className="text-red-500 mb-2">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900">Failed to load analytics</p>
          <p className="text-sm mt-1">{error}</p>
          <button onClick={() => loadData(filter)} className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
            Try Again
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6 pb-8 overflow-y-auto pr-2">
          {/* Row 1: Overview Cards */}
          {overview && (
            <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
              <StatCard 
                title="Total Sessions" 
                value={formatNumber(overview.current.sessions)}
                growth={overview.growth.sessions.toFixed(0)}
                growthType={overview.growth.sessions >= 0 ? 'positive' : 'negative'}
                icon={Eye} iconColorClass="text-[#f95724]" bgClass="bg-[#fff2ee]"
              />
              <StatCard 
                title="Unique Visitors" 
                value={formatNumber(overview.current.visitors)}
                growth={overview.growth.visitors.toFixed(0)}
                growthType={overview.growth.visitors >= 0 ? 'positive' : 'negative'}
                icon={Users} iconColorClass="text-[#f95724]" bgClass="bg-[#fff2ee]"
              />
              <StatCard 
                title="Avg. Session Duration" 
                value={formatDuration(overview.current.avgDuration)}
                growth={overview.growth.duration.toFixed(0)}
                growthType={overview.growth.duration >= 0 ? 'positive' : 'negative'}
                icon={Clock} iconColorClass="text-[#f95724]" bgClass="bg-[#fff2ee]"
              />
              <StatCard 
                title="Bounce Rate" 
                value={`${overview.current.bounceRate.toFixed(1)}%`}
                growth={overview.growth.bounceRate.toFixed(0)}
                growthType={overview.growth.bounceRate <= 0 ? 'positive' : 'negative'}
                icon={MousePointerClick} iconColorClass="text-[#f95724]" bgClass="bg-[#fff2ee]"
              />
            </div>
          )}

          {/* Row 2: Traffic Chart */}
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col min-h-[400px]">
            <div className="mb-4">
              <h3 className="text-[16px] font-extrabold text-gray-900">Website Traffic</h3>
              <p className="text-[13px] text-gray-500 font-medium">Sessions, users & page views — last {filter}</p>
            </div>
            
            <div className="flex-1 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 700 }}
                  />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} verticalAlign="top" />
                  <Area type="monotone" dataKey="pageViews" name="Pageviews" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorPageviews)" />
                  <Area type="monotone" dataKey="sessions" name="Sessions" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorSessions)" />
                  <Area type="monotone" dataKey="users" name="Users" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 3: Leads Generated (Full Width) */}
          <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col min-h-[350px]">
            <div className="mb-4">
              <h3 className="text-[16px] font-extrabold text-gray-900">Leads Generated</h3>
              <p className="text-[13px] text-gray-500 font-medium">By inquiry type — 12 months</p>
            </div>
            
            <div className="flex-1 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={36}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="label" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 700 }}
                  />
                  <RechartsTooltip cursor={{fill: 'transparent'}} content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} verticalAlign="top" />
                  
                  {/* Stacked Bars */}
                  <Bar dataKey="CONTACT" name="Contact" stackId="a" fill="#f97316" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="DEMO_REQUEST" name="Demo Request" stackId="a" fill="#ef4444" />
                  <Bar dataKey="QUOTE" name="Quote" stackId="a" fill="#eab308" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Analytics;
