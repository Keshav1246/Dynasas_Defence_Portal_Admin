import React from 'react';
import { ExternalLink, Trash2, Edit2, Shield, Plane, Globe, Microscope, Settings, Bot, Telescope, Satellite } from 'lucide-react';

export const PartnerCard = ({ partner, onEdit, onDelete }) => {
  const getIcon = (name) => {
    switch(name) {
      case 'Lockheed Martin': return <Shield className="w-6 h-6 text-gray-700" />;
      case 'Northrop Grumman': return <Plane className="w-6 h-6 text-blue-500" />;
      case 'BAE Systems': return <Globe className="w-6 h-6 text-indigo-500" />;
      case 'Raytheon Technologies': return <Microscope className="w-6 h-6 text-purple-500" />;
      case 'General Dynamics': return <Settings className="w-6 h-6 text-gray-600" />;
      case 'Shield AI': return <Bot className="w-6 h-6 text-teal-500" />;
      case 'L3Harris Technologies': return <Telescope className="w-6 h-6 text-blue-800" />;
      case 'Maxar Technologies': return <Satellite className="w-6 h-6 text-blue-600" />;
      default: return <Shield className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 p-5 flex flex-col h-[280px] group transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shadow-sm">
          {getIcon(partner.name)}
        </div>
        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wide ${partner.status === 'ACTIVE' || partner.status === 'Active' ? 'bg-[#eefcf3] text-[#10b981]' : 'bg-gray-100 text-gray-500'}`}>
          {partner.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-extrabold text-gray-900 text-base leading-tight">{partner.name}</h3>
        <div className="mt-1">
          <span className="px-2 py-0.5 bg-[#fff2ee] text-[#f95724] text-[10px] font-bold rounded">{partner.category}</span>
        </div>
        <p className="text-sm text-gray-500 mt-4 line-clamp-3 leading-relaxed">
          {partner.description}
        </p>
      </div>

      {/* Footer Area with inline hover state */}
      <div className="mt-auto pt-4 h-[52px] flex items-center border-t border-transparent group-hover:border-gray-50 transition-colors">
        <div className="flex items-center text-xs font-medium text-gray-400 group-hover:hidden w-full transition-opacity">
          <Globe className="w-3.5 h-3.5 mr-1.5 opacity-70" />
          {partner.website || partner.url}
        </div>
        
        <div className="hidden group-hover:flex items-center justify-between w-full animate-in fade-in zoom-in duration-200">
          <button 
            className="flex-1 flex items-center justify-center gap-2 text-[13px] font-bold text-[#f95724] bg-[#fff2ee] hover:bg-[#ffe4db] rounded-xl h-9 transition-colors"
            onClick={() => onEdit(partner)}
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
          <div className="flex items-center ml-2 space-x-2">
            <button 
              className="w-9 h-9 flex items-center justify-center text-blue-600 bg-[#edf2fe] hover:bg-blue-100 rounded-xl transition-colors"
              onClick={() => { if(partner.website || partner.url) window.open(partner.website || partner.url, '_blank'); }}
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button 
              className="w-9 h-9 flex items-center justify-center text-red-600 bg-[#ffe4e6] hover:bg-red-100 rounded-xl transition-colors" 
              onClick={() => onDelete(partner)}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

