import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app);
export default db;
