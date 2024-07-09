import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

const appKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: appKey,
  authDomain: 'wallpaperapp-b6bc2.firebaseapp.com',
  projectId: 'wallpaperapp-b6bc2',
  storageBucket: 'wallpaperapp-b6bc2.appspot.com',
  messagingSenderId: '640884075238',
  appId: '1:640884075238:web:77878572c24cebb80e2927',
  measurementId: 'G-J2CZETSRBJ',
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app!);
export default db;
