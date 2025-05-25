
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.55ccc3a081c345dba0c220764d6839b3',
  appName: 'wasfah-ai-kitchen-pal',
  webDir: 'dist',
  server: {
    url: 'https://55ccc3a0-81c3-45db-a0c2-20764d6839b3.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    backgroundColor: '#ffffff'
  }
};

export default config;
