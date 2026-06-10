import {
  LayoutGrid,
  Layers,
  Building2,
  FileEdit,
  Image as ImageIcon,
  Handshake,
  MessageSquare,
  BarChart2,
  Users,
  Settings
} from 'lucide-react';

export const sidebarConfig = [
  {
    title: 'Dashboard',
    icon: LayoutGrid,
    path: '/dashboard',
  },
  {
    title: 'Services',
    icon: Layers,
    path: '/services',
  },
  {
    title: 'Company Profile',
    icon: Building2,
    path: '/company-profile',
  },
  {
    title: 'Content Management',
    icon: FileEdit,
    path: '/content-management',
  },
  {
    title: 'Media Library',
    icon: ImageIcon,
    path: '/media-library',
  },
  {
    title: 'Partner Management',
    icon: Handshake,
    path: '/partner-management',
  },
  {
    title: 'Contact & Inquiries',
    icon: MessageSquare,
    path: '/contact-inquiries',
    badge: 8,
  },
  {
    title: 'Analytics',
    icon: BarChart2,
    path: '/analytics',
  },
  {
    title: 'Admin Users',
    icon: Users,
    path: '/admin-users',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/settings',
  }
];
