import 'dotenv/config';
import { Color } from './src/styles/Color';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const googlePlacesApiKey = process.env.GOOGLE_PLACES_API_KEY;

export default {
  expo: {
    name: 'flamingo',
    slug: 'flamingo',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: 'ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: 'ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-image-picker',
        {
          photosPermission:
            'The app accesses your photos to let you share them with your friends.',
        },
      ],
    ],
    extra: {
      eas: {
        projectId: '434dcc4c-4d72-4730-bb34-50de1070545b',
      },
      supabaseUrl,
      supabaseKey,
      googlePlacesApiKey,
    },
  },
};
