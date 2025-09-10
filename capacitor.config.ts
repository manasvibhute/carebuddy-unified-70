import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.9befaa9982224f01a904a47c471377f8',
  appName: 'carebuddy-unified',
  webDir: 'dist',
  server: {
    url: 'https://9befaa99-8222-4f01-a904-a47c471377f8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    BiometricAuth: {
      allowDeviceCredential: true
    }
  }
};

export default config;