import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const url = Constants?.manifest?.extra?.supabaseUrl as string;
const key = Constants?.manifest?.extra?.supabaseKey as string;

export const supabase = createClient(url, key, {
  localStorage: AsyncStorage as any,
  detectSessionInUrl: false, // Prevents Supabase from evaluating window.location.href, breaking mobile
});
