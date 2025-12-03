import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBIJQUqttTmrYmQnu3ot46B-Xa5DoD6FRU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rebekhacaterers-a6002.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rebekhacaterers-a6002",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rebekhacaterers-a6002.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "147755118472",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:147755118472:web:8228b657b262f1ed16143d",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MMCHDVCCGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Analytics (only if supported by the browser)
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log('Google Analytics initialized');
  }
});

export { analytics };
export default app;
