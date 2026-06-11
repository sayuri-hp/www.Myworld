export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  category: string;
  view_count: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  funny_description: string;
  icon: string | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  icon: string | null;
  created_at: string;
}

export interface BibleVerse {
  id: string;
  verse_text: string;
  reference: string;
  is_featured: boolean;
  created_at: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface VisitorStat {
  id: string;
  stat_key: string;
  stat_value: number;
  updated_at: string;
}

export interface PersonalInfo {
  id: string;
  full_name: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string | null;
  location: string;
  resume_url: string | null;
  profile_image_url: string | null;
  updated_at: string;
}
