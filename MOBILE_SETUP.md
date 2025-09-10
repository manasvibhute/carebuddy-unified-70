# Healthcare App - Mobile Setup with Biometric Authentication

This healthcare app now includes biometric authentication for patients using Capacitor for native mobile functionality.

## Features Added

✅ **Biometric Authentication for Patients**
- Fingerprint authentication (Android)
- Touch ID / Face ID (iOS)
- Fallback to manual login if biometric fails
- Web fallback with mock authentication for testing

✅ **Voice Features**
- Text-to-speech page reader
- Voice navigation commands
- Voice input for form fields

✅ **Complete Healthcare Platform**
- Patient & Doctor dashboards
- Appointment booking and management
- Medical reports with document scanner
- Pharmacy with medicine ordering
- Video call integration
- Emergency SOS button

## Mobile App Setup

### Prerequisites

1. **For iOS**: Mac with Xcode installed
2. **For Android**: Android Studio installed
3. **Node.js** (version 16 or higher)

### Step 1: Export to GitHub

1. Click the "Export to GitHub" button in Lovable
2. Create a new repository or use an existing one
3. Git pull the project to your local machine

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Initialize Capacitor

Capacitor is already configured! The configuration is in `capacitor.config.ts`:

```typescript
{
  appId: 'app.lovable.9befaa9982224f01a904a47c471377f8',
  appName: 'carebuddy-unified',
  webDir: 'dist'
}
```

### Step 4: Add Native Platforms

```bash
# For iOS (requires Mac with Xcode)
npx cap add ios

# For Android (requires Android Studio)
npx cap add android

# Update native dependencies
npx cap update ios
npx cap update android
```

### Step 5: Build and Sync

```bash
# Build the web app
npm run build

# Sync to native platforms
npx cap sync
```

### Step 6: Run on Device/Emulator

```bash
# Run on Android
npx cap run android

# Run on iOS (Mac only)
npx cap run ios
```

## Biometric Authentication

### How it Works

1. **Patients** see biometric login option automatically
2. **Doctors** use normal login (email/password)
3. **Fallback**: If biometric fails, users can use manual login
4. **Web Testing**: Mock biometric authentication with 70% success rate

### Permissions Required

The app will automatically request the following permissions:

- **Android**: `USE_FINGERPRINT`, `USE_BIOMETRIC`
- **iOS**: Biometric authentication permission via Face ID/Touch ID

### Testing Biometric Authentication

#### On Web Browser
- Biometric authentication is mocked for testing
- 70% success rate simulation
- Shows fingerprint icon and authentication flow

#### On Real Device
- Use actual fingerprint/Face ID/Touch ID
- Real biometric verification
- Secure keychain/keystore integration

## Troubleshooting

### Build Issues
```bash
# Clean and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
npx cap sync
```

### Android Issues
```bash
# Open in Android Studio for debugging
npx cap open android
```

### iOS Issues
```bash
# Open in Xcode for debugging
npx cap open ios
```

### Biometric Not Working
1. Ensure device has biometric authentication set up
2. Check app permissions in device settings
3. Use manual login as fallback

## Production Deployment

### Android Play Store
1. Build signed APK in Android Studio
2. Upload to Google Play Console
3. Configure app permissions and metadata

### iOS App Store
1. Build for release in Xcode
2. Archive and upload to App Store Connect
3. Configure app metadata and screenshots

## Additional Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Biometric Plugin Documentation](https://github.com/capgo/capacitor-native-biometric)
- [Running on Physical Device Guide](https://lovable.dev/blogs/TODO)

## Support

For mobile development questions, check out our [mobile development blog post](https://lovable.dev/blogs/TODO) for detailed instructions and troubleshooting tips.