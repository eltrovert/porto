import { LucideIcon } from 'lucide-react';

export type ViewType = 'home' | 'projects' | 'posts' | 'talks' | 'about' | 'uses' | 'life' | 'books' | 'guestbook' | 'notes' | 'kudos' | 'privacy' | 'terms' | 'sitemap' | 'deck';

export interface NavItem {
  label: string;
  href: string;
}

export interface MegaMenuItem {
  title: string;
  description: string;
  href: string;
  image?: string; // For the card style items
  icon?: LucideIcon; // For the list style items
}