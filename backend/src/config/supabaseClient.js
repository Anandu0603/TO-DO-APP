import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

if (supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url' && supabaseKey !== 'your_supabase_key') {
  console.log('Supabase client initialized');
} else {
  console.warn('Supabase credentials are not fully configured. Using mock data for tasks if applicable.');
}
