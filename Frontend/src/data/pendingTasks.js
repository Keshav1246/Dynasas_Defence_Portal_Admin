import { MessageSquare, ShieldAlert, Layers, FolderHeart } from 'lucide-react';

export const pendingTasks = [
  { id: 1, title: 'Pending Inquiries', count: 8, icon: MessageSquare, colorClass: 'text-orange-500', bgClass: 'bg-orange-50' },
  { id: 2, title: 'Partner Requests Awaiting Approval', count: 3, icon: ShieldAlert, colorClass: 'text-rose-500', bgClass: 'bg-rose-50' },
  { id: 3, title: 'Draft Services Ready for Review', count: 5, icon: Layers, colorClass: 'text-indigo-500', bgClass: 'bg-indigo-50' },
  { id: 4, title: 'Media Files Pending Categorization', count: 2, icon: FolderHeart, colorClass: 'text-amber-500', bgClass: 'bg-amber-50' },
];
