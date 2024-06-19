import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import db from './firebase';
import { misc } from '@/constants/misc';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const auth = getAuth();

export const createDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const getDocument = async (collectionName: string, userName: string) => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, collectionName), where('userName', '==', userName))
    );
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().userName}`);
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const login = (email: string, password: string, userName) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      getDocument(misc.USER_COLLECTION_NAME);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log('signin error', errorMessage);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Invalid Credentials',
        textBody: 'Login failed due to invalid credentials',
      });
    });
};

export const register = (email: string, password: string, userName: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      createDocument(misc.USER_COLLECTION_NAME, {
        userName: userName,
      });
      login(email, password);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log('register error', errorMessage);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Something Went Wrong',
        textBody: 'Unable to register',
      });
    });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
