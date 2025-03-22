export type Teacher = {
  id: number;
  name: string;
  role: string;
  profile: string;
  full_profile: string;
  image_url: string;
  lessons: string[];
  schedule: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type Lesson = {
  id: number;
  title: string;
  description: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author_id: number;
  category_id: number;
  slug: string;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type BlogCategory = {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
};

export type NewsItem = {
  id: number;
  title: string;
  content: string;
  published_at: string;
  created_at: string;
  updated_at: string;
};

export type ContactForm = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  created_at: string;
  status: 'new' | 'in_progress' | 'completed';
};

export type Booking = {
  id: number;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  lesson_id: number;
  teacher_id: number;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: 'student' | 'teacher' | 'admin';
  created_at: string;
  updated_at: string;
};

// Supabaseのテーブル名を定義
export const Tables = {
  TEACHERS: 'teachers',
  LESSONS: 'lessons',
  BLOG_POSTS: 'blog_posts',
  BLOG_CATEGORIES: 'blog_categories',
  NEWS: 'news',
  CONTACTS: 'contacts',
  BOOKINGS: 'bookings',
  USERS: 'users',
} as const;
