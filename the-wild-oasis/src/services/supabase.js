import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://nchebwndndhfsofpbqvi.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jaGVid25kbmRoZnNvZnBicXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2MzAxMDgsImV4cCI6MjAyMDIwNjEwOH0.sfi2c1crm1312752MSwte0f9IXb3G3CxQNTpZoWdVtc';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
