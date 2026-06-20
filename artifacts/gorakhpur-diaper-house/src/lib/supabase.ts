import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (import.meta.env.DEV) {
  if (!supabaseUrl || !supabaseKey) {
    console.error('[Supabase] Missing env vars — VITE_SUPABASE_URL:', supabaseUrl ? 'SET' : 'MISSING', '| VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'SET' : 'MISSING')
  } else {
    console.log('[Supabase] Client initialised ✓')
  }
}

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null
