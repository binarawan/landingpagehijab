
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wjclmoobjbsrweguolpl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqY2xtb29iamJzcndlZ3VvbHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4NDAzMzMsImV4cCI6MjA4NTQxNjMzM30.W_XdNisXNONo0Qm6PE2XRQq1AWUeJa62X-vQqbEvSNM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
