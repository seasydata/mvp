import { auth } from '@clerk/nextjs/server'
import { supabase } from './supabase'

export const createContext = async () => {
const authObj = await auth();
// console.log(authObj);
  return { auth: authObj, supabase: supabase }
}

export type Context = Awaited<ReturnType<typeof createContext>>