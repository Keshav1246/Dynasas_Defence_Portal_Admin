import React from 'react';
import { ExternalLink } from 'lucide-react';

const LivePreview = ({ heroData }) => {
  return (
    <div className="w-full lg:w-[220px] shrink-0">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-bold text-gray-900">Live Preview</h3>
        <button className="text-xs font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1.5 transition-colors">
          <ExternalLink className="w-3.5 h-3.5" />
          Open
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col items-center">
        {/* Dark Hero Card Preview */}
        <div className="w-full p-4 mt-2">
          <div className="w-full bg-[#1A1C23] rounded-xl flex flex-col items-center justify-center p-4 min-h-[100px] text-center shadow-md">
            <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mb-1.5">DYNASOFT</span>
            {heroData?.heroTitle ? (
              <span className="text-xs font-bold text-white leading-snug line-clamp-2">
                {heroData.heroTitle}
              </span>
            ) : null}
            {heroData?.heroSubtitle ? (
              <span className="text-[9px] font-medium text-gray-400 leading-tight line-clamp-2 mt-1.5">
                {heroData.heroSubtitle}
              </span>
            ) : null}
            {!heroData?.heroTitle && !heroData?.heroSubtitle && (
              <span className="text-xs text-gray-500 font-medium italic mt-2">No hero content</span>
            )}
          </div>
        </div>

        {/* Skeleton Sections */}
        <div className="w-full px-4 flex flex-col gap-2 pb-4">
          <div className="w-full h-8 bg-gray-50 rounded-lg flex items-center px-3 border border-gray-100">
            <span className="text-[10px] font-medium text-gray-400">&bull; Services</span>
          </div>
          <div className="w-full h-8 bg-gray-50 rounded-lg flex items-center px-3 border border-gray-100">
            <span className="text-[10px] font-medium text-gray-400">&bull; About</span>
          </div>
          <div className="w-full h-8 bg-gray-50 rounded-lg flex items-center px-3 border border-gray-100">
            <span className="text-[10px] font-medium text-gray-400">&bull; Statistics</span>
          </div>
          <div className="w-full h-8 bg-gray-50 rounded-lg flex items-center px-3 border border-gray-100">
            <span className="text-[10px] font-medium text-gray-400">&bull; Footer</span>
          </div>
        </div>

        {/* Bottom Status Card */}
        <div className="w-full p-4 pt-2">
          <div className="w-full bg-[#FFF7F2] rounded-xl py-3 flex flex-col items-center justify-center border border-[#FDBA74]">
            <span className="text-xs font-semibold text-[#F97316] mb-0.5">dynasoft.com</span>
            <span className="text-[10px] text-[#F97316]/70 font-medium">Last updated: 2m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
