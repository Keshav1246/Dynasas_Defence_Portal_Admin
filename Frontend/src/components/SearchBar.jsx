import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/api';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search-input')?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`);
        setResults(res.data.data || []);
        setIsOpen(true);
        setSelectedIndex(-1);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleNavigate = (item) => {
    setIsOpen(false);
    setQuery('');
    if (item.type === 'Service') {
      navigate('/services');
    } else if (item.type === 'Partner') {
      navigate('/partner-management');
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        handleNavigate(results[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-[140px] sm:max-w-[200px] lg:max-w-[260px] mr-2 lg:mr-0 lg:ml-3" ref={dropdownRef}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        {isLoading ? (
          <Loader2 className="w-[14px] h-[14px] text-slate-400 animate-spin" />
        ) : (
          <Search className="w-[14px] h-[14px] text-slate-400" strokeWidth={2} />
        )}
      </div>
      <input
        id="global-search-input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
        className="w-full bg-[#f4f5f7] hover:bg-[#ebedf1] focus:bg-white focus:ring-1 focus:ring-[#ff5a36]/30 transition-all border border-transparent focus:border-[#ff5a36]/40 outline-none py-1.5 pl-[34px] pr-3 lg:pr-9 rounded-full text-[12.5px] text-slate-700 placeholder-slate-400 font-medium h-[32px]"
      />
      <div className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 items-center pointer-events-none">
        <div className="bg-[#e4e6ea] px-1 py-[2px] rounded-[4px] text-[9px] font-bold text-slate-400 flex items-center gap-[1px]">
          <span className="text-[10px] leading-none">⌘</span>
          <span>K</span>
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[300px] lg:w-full bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((item, index) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className={`px-4 py-2.5 cursor-pointer flex flex-col gap-0.5 ${
                    index === selectedIndex ? 'bg-slate-50' : 'hover:bg-slate-50'
                  }`}
                  onClick={() => handleNavigate(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className="text-sm font-semibold text-slate-800">{item.title}</span>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{item.type}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-4 text-center text-sm text-slate-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
