import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const url = Constants?.manifest?.extra?.supabaseUrl as string;
const key = Constants?.manifest?.extra?.supabaseKey as string;

export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
