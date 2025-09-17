# Firebase Setup Guide

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: `celpip-writing-coach`
4. Enable Google Analytics (optional)
5. Click "Create project"

## 2. Enable Authentication

1. In your Firebase project, go to **Authentication**
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password**
5. Enable **Google** (optional but recommended)
   - Add your domain to authorized domains if needed

## 3. Create Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll secure it later)
4. Select a location close to your users
5. Click **Done**

## 4. Get Firebase Configuration

1. Go to **Project settings** (gear icon)
2. Scroll down to **Your apps**
3. Click **Web** icon (`</>`)
4. Enter app nickname: `celpip-writing-coach`
5. **Don't** check "Set up Firebase Hosting"
6. Click **Register app**
7. Copy the config object

## 5. Set Environment Variables

Create a `.env` file in your project root and add:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

# OpenAI API Key (already set for Netlify Functions)
OPENAI_API_KEY=your_openai_api_key_here
```

Replace the values with your actual Firebase config values.

## 6. Add Environment Variables to Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Select your **celpip-writing-coach** site
3. Go to **Site settings** > **Environment variables**
4. Add each React environment variable:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`
   - `REACT_APP_FIREBASE_MEASUREMENT_ID`

## 7. Deploy and Test

1. Push your code to GitHub
2. Netlify will automatically rebuild
3. Test user registration and login
4. Verify essay history is saving

## Firestore Security Rules (Optional)

Once testing is complete, update Firestore rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Essays can only be accessed by their owner
    match /essays/{essayId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Next Steps

After Firebase is set up:
- ✅ User authentication works
- ✅ Essay history is saved
- ✅ Progress tracking displays
- 🔄 **Next**: Add sample essays for reference
- 🔄 **Next**: Implement performance analytics
- 🔄 **Next**: Add more dashboard features
