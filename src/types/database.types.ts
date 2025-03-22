export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: number
          category_id: number
          content: string
          created_at: string
          excerpt: string
          id: number
          image_url: string
          published_at: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: number
          category_id: number
          content: string
          created_at?: string
          excerpt: string
          id?: number
          image_url: string
          published_at?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: number
          category_id?: number
          content?: string
          created_at?: string
          excerpt?: string
          id?: number
          image_url?: string
          published_at?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          }
        ]
      }
      bookings: {
        Row: {
          created_at: string
          date: string
          email: string
          id: number
          lesson_id: number
          message: string | null
          name: string
          phone: string | null
          status: string
          teacher_id: number
          time: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date: string
          email: string
          id?: number
          lesson_id: number
          message?: string | null
          name: string
          phone?: string | null
          status?: string
          teacher_id: number
          time: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          email?: string
          id?: number
          lesson_id?: number
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
          teacher_id?: number
          time?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_lesson_id_fkey"
            columns: ["lesson_id"]
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_teacher_id_fkey"
            columns: ["teacher_id"]
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      contacts: {
        Row: {
          id: number
          name: string
          email: string
          phone: string | null
          contact_type: string
          preferred_contact: string
          subject: string
          message: string
          file_url: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          phone?: string | null
          contact_type: string
          preferred_contact: string
          subject: string
          message: string
          file_url?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          phone?: string | null
          contact_type?: string
          preferred_contact?: string
          subject?: string
          message?: string
          file_url?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contacts_old: {
        Row: {
          created_at: string
          email: string
          id: number
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          message: string
          name: string
          phone?: string | null
          status?: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          created_at: string
          description: string
          id: number
          image_url: string
          price: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          image_url: string
          price: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          image_url?: string
          price?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          content: string
          created_at: string
          id: number
          published_at: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          published_at?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          published_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      teachers: {
        Row: {
          created_at: string
          full_profile: string
          id: number
          image_url: string
          lessons: string[]
          name: string
          profile: string
          role: string
          schedule: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_profile: string
          id?: number
          image_url: string
          lessons?: string[]
          name: string
          profile: string
          role: string
          schedule: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_profile?: string
          id?: number
          image_url?: string
          lessons?: string[]
          name?: string
          profile?: string
          role?: string
          schedule?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
