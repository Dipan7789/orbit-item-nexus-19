
import { User as SupabaseUser } from '@supabase/supabase-js';

// Extended User type with custom user metadata
export interface User extends SupabaseUser {
  name?: string;
  avatar?: string;
}

// Helper function to convert a Supabase User to our extended User type
export function extendUser(user: SupabaseUser | null): User | null {
  if (!user) return null;
  
  return {
    ...user,
    name: user.user_metadata?.name || null,
    avatar: user.user_metadata?.avatar_url || null
  };
}
