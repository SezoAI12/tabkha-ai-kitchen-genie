
# WasfahAI Deployment Guide

## Web Deployment (Lovable Platform)

### 1. Deploy to Lovable
1. Click the "Publish" button in the top-right corner of the Lovable editor
2. Your app will be automatically deployed to a Lovable subdomain (e.g., `yourapp.lovable.app`)
3. The deployment is automatic and includes all your latest changes

### 2. Custom Domain (Paid Plan Required)
1. Go to Project → Settings → Domains in Lovable
2. Add your custom domain (e.g., `wasfah.ai`)
3. Follow the DNS configuration instructions provided
4. Wait for SSL certificate provisioning (usually 5-15 minutes)

## Mobile App Deployment (APK Build)

### Prerequisites
- Node.js 18+ installed
- Android Studio installed
- JDK 11+ installed
- Git installed

### Step 1: Export Project from Lovable
1. Click the GitHub button in the top-right corner of Lovable
2. Connect your GitHub account if not already connected
3. Click "Export to GitHub" to create a repository
4. Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Initialize Capacitor (if not already done)
```bash
npx cap init
```

Configuration values:
- App ID: `app.wasfah.kitchen`
- App Name: `WasfahAI`

### Step 4: Add Android Platform
```bash
npx cap add android
```

### Step 5: Build the Web App
```bash
npm run build
```

### Step 6: Sync with Native Platform
```bash
npx cap sync android
```

### Step 7: Open in Android Studio
```bash
npx cap open android
```

### Step 8: Configure Android App
1. In Android Studio, navigate to `app/src/main/AndroidManifest.xml`
2. Add required permissions:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### Step 9: Generate Signed APK
1. In Android Studio, go to `Build` → `Generate Signed Bundle / APK`
2. Choose `APK`
3. Create a new keystore or use existing one:
   - Keystore path: `wasfah-keystore.jks`
   - Password: (create secure password)
   - Alias: `wasfah-key`
4. Select `release` build variant
5. Click `Finish`

### Step 10: Locate Your APK
The signed APK will be generated at:
```
android/app/release/app-release.apk
```

## iOS Deployment (IPA Build)

### Prerequisites
- macOS with Xcode 14+
- iOS Developer Account ($99/year)
- Xcode Command Line Tools

### Step 1: Add iOS Platform
```bash
npx cap add ios
```

### Step 2: Sync with iOS
```bash
npx cap sync ios
```

### Step 3: Open in Xcode
```bash
npx cap open ios
```

### Step 4: Configure iOS App
1. In Xcode, select your project in the navigator
2. Update Bundle Identifier: `com.wasfah.kitchen`
3. Select your Development Team
4. Configure signing certificates

### Step 5: Add Required Permissions (Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to scan dishes and ingredients</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs microphone access for voice commands in cooking mode</string>
<key>NSSpeechRecognitionUsageDescription</key>
<string>This app uses speech recognition for voice commands</string>
```

### Step 6: Build for Release
1. Select `Product` → `Archive`
2. Once archived, click `Distribute App`
3. Choose deployment method:
   - App Store Connect (for App Store)
   - Ad Hoc (for testing)
   - Enterprise (if you have enterprise account)

## Environment Variables

### For Production Deployment
Create a `.env.production` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SPEECH_SYNTHESIS_VOICE_AR=ar-SA
VITE_SPEECH_SYNTHESIS_VOICE_EN=en-US
VITE_SPEECH_SYNTHESIS_VOICE_TR=tr-TR
```

## App Store Submission

### iOS App Store
1. Create app in App Store Connect
2. Upload binary via Xcode or Application Loader
3. Fill in app metadata (Arabic and English descriptions)
4. Add screenshots for different device sizes
5. Submit for review

### Google Play Store
1. Create app in Google Play Console
2. Upload signed APK
3. Add app description in multiple languages
4. Add screenshots and graphics
5. Set up content rating
6. Submit for review

## Testing Before Deployment

### Web Testing
```bash
npm run build
npm run preview
```

### Mobile Testing
```bash
# For Android
npx cap run android

# For iOS
npx cap run ios
```

## Performance Optimization

### Web Optimization
1. Enable gzip compression on server
2. Use CDN for static assets
3. Implement service worker for caching
4. Optimize images (WebP format)

### Mobile Optimization
1. Enable ProGuard for Android (reduces APK size)
2. Use app bundles instead of APK for Play Store
3. Optimize images for mobile screens
4. Test on various device sizes

## Monitoring and Analytics

### Set up monitoring:
1. Google Analytics for web
2. Firebase Analytics for mobile
3. Error reporting (Sentry)
4. Performance monitoring

## Maintenance

### Regular Updates
1. Update dependencies monthly
2. Test on latest OS versions
3. Monitor user feedback
4. Update translations based on user regions

### Security
1. Regular security audits
2. Update API keys periodically
3. Monitor for vulnerabilities
4. Implement proper authentication

## Troubleshooting

### Common Issues
1. **Build fails**: Check Node.js version compatibility
2. **Camera not working**: Verify permissions in manifest
3. **RTL layout issues**: Test on actual Arabic devices
4. **Voice commands fail**: Check microphone permissions

### Support Contacts
- Capacitor Issues: [Capacitor Community](https://github.com/ionic-team/capacitor)
- Deployment Issues: [Your development team]
- App Store Issues: Apple/Google developer support

---

**Note**: Always test thoroughly on real devices before submitting to app stores. Consider beta testing with a small group of users first.
