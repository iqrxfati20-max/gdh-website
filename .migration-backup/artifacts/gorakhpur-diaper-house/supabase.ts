import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cwjzbpbekkxqllkcnxtf.supabase.co
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3anpicGJla2t4cWxsa2NueHRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDc2MzIsImV4cCI6MjA5NTE4MzYzMn0.aa5HsHtRGCp1ytTW0b2Vk0QGJIfe30JBYjO9gjFScno'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)