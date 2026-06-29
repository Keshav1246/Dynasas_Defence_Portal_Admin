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
  Settings,
  MapPin
} from 'lucide-react';

export const sidebarConfig = [
  {
    title: 'Dashboard',
    icon: LayoutGrid,
    path: '/admin/dashboard',
  },
  {
    title: 'Services',
    icon: Layers,
    path: '/admin/services',
  },
  {
    title: 'Company Profile',
    icon: Building2,
    path: '/admin/company-profile',
  },
  {
    title: 'Office Management',
    icon: MapPin,
    path: '/admin/offices',
  },
  {
    title: 'Content Management',
    icon: FileEdit,
    path: '/admin/content',
  },
  {
    title: 'Media Library',
    icon: ImageIcon,
    path: '/admin/media-library',
  },
  {
    title: 'Partner Management',
    icon: Handshake,
    path: '/admin/partner-management',
  },
  {
    title: 'Contact & Inquiries',
    icon: MessageSquare,
    path: '/admin/contact-inquiries',
    badge: 8,
  },
  {
    title: 'Analytics',
    icon: BarChart2,
    path: '/admin/analytics',
  },
  {
    title: 'Admin Users',
    icon: Users,
    path: '/admin/admin-users',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/admin/settings',
  }
];
