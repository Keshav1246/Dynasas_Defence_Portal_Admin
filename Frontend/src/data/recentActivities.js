import { FileText, Layers, Handshake, Upload, CheckCircle, UserPlus } from 'lucide-react';

export const recentActivities = [
  { id: 1, action: 'Admin updated Hero Section', time: '2 min ago', icon: FileText, iconColor: 'text-orange-500', bgColor: 'bg-orange-50' },
  { id: 2, action: 'Admin added new Service — Autonomous ISR', time: '18 min ago', icon: Layers, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { id: 3, action: 'Partner profile updated — BAE Systems', time: '1 hr ago', icon: Handshake, iconColor: 'text-blue-500', bgColor: 'bg-blue-50' },
  { id: 4, action: 'Media uploaded — titan-x-hero.mp4 (128 MB)', time: '2 hr ago', icon: Upload, iconColor: 'text-amber-500', bgColor: 'bg-amber-50' },
  { id: 5, action: 'Inquiry from Lockheed Martin marked resolved', time: '3 hr ago', icon: CheckCircle, iconColor: 'text-emerald-500', bgColor: 'bg-emerald-50' },
  { id: 6, action: 'New admin user created — k.chen@dynasoft.com', time: '5 hr ago', icon: UserPlus, iconColor: 'text-purple-500', bgColor: 'bg-purple-50' },
];
