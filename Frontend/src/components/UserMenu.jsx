import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Lock, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
  const { logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 pr-1.5 rounded-lg transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Avatar */}
                <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[#ff5a36] to-[#e63920] flex items-center justify-center shrink-0 shadow-[0_2px_4px_rgba(255,90,54,0.15)]">
                    <span className="text-white font-bold text-[12px] tracking-wide">AU</span>
                </div>

                {/* Text Info */}
                <div className="hidden lg:flex flex-col justify-center">
                    <span className="text-[#111827] font-semibold text-[12.5px] leading-tight">Admin User</span>
                    <span className="text-slate-400 text-[10.5px] font-medium leading-tight mt-[1px]">Super Admin</span>
                </div>

                {/* Dropdown Icon */}
                <ChevronDown 
                    className={`hidden lg:block w-[12px] h-[12px] text-slate-400 ml-1 mt-[1px] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    strokeWidth={2} 
                />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1">
                        <button 
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            onClick={() => {
                                setIsOpen(false);
                                navigate('/admin/settings');
                            }}
                        >
                            <Lock className="w-4 h-4 text-slate-400" />
                            <span className="font-medium">Change Password</span>
                        </button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button 
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
