import { supabase } from './supabase'

export const createContext = async () => {

  return { supabase: supabase };
}

export type Context = Awaited<ReturnType<typeof createContext>>