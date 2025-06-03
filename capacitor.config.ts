
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.wasfah.ai.kitchen',
  appName: 'Wasfah AI Kitchen Pal',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#009594",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      spinnerColor: "#ffffff"
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#009594'
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true
    },
    App: {
      appendUserAgent: 'WasfahAI'
    }
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#009594'
  },
  android: {
    backgroundColor: '#009594',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  }
};

export default config;
