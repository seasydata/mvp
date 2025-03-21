import {auth} from '@clerk/nextjs/server'
import { supabase } from './supabase'


export const createContext = async () => {

  return { supabase: supabase, auth: await auth() }
}

export type Context = Awaited<ReturnType<typeof createContext>>