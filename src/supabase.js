import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://injxqpbbjbplrcjdxkxi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluanhxcGJiamJwbHJjamR4a3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2NzgzNTcsImV4cCI6MjA5ODI1NDM1N30.yRMOZlBVZ0b9BsQB12t1Q1pEWldRNLikMPmcjWjN6OU'

export const supabase = createClient(supabaseUrl, supabaseKey)