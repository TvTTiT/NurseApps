import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

const ExpoSecureStoreAdapter = {
  getItem: (key) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key, value) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key) => {
    SecureStore.deleteItemAsync(key);
  },
};
const supabaseUrl = 'https://ilpaldyiekudtedaxfiv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlscGFsZHlpZWt1ZHRlZGF4Zml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NTAzNzksImV4cCI6MjAwMTUyNjM3OX0.jYxHQWfZ0jz-tb5fuU8CwgHJD_RyLzpof1pV1LvVeRI'; 
export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

