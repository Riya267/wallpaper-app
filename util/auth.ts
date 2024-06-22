import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  setDoc,
  doc,
  getDoc,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore';
import db from './firebase';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { auth } from '../util/firebase';

const showToast = (type: ALERT_TYPE, title: string, textBody: string) => {
  Toast.show({
    type,
    title,
    textBody,
  });
};

export const createDocument = async (
  collectionName: string,
  data: DocumentData,
  customId: string
): Promise<void> => {
  try {
    await setDoc(doc(db, collectionName, customId), data);
    console.log('Document written with ID:', customId);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating document:', error);
    }
  }
};

export const getDocument = async (
  collectionName: string,
  customId: string
): Promise<DocumentData | null> => {
  try {
    const docRef: DocumentReference = doc(db, collectionName, customId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error retrieving document:', error);
      showToast(
        ALERT_TYPE.DANGER,
        'Document Retrieval Failed',
        'Unable to retrieve document'
      );
      return null;
    }
    return null;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<boolean | Record<string, string>> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log('userObject', userCredential.user.displayName);
    showToast(ALERT_TYPE.SUCCESS, 'SignIn', 'User Login successfully');
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('signin error', error.message);
      showToast(
        ALERT_TYPE.DANGER,
        'Invalid Credentials',
        'Login failed due to invalid credentials'
      );
      return false;
    }
    return false;
  }
};

export const register = async (
  email: string,
  password: string,
  userName: string
): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser as User, {
      displayName: userName,
    }).catch((err) => console.log(err));
    showToast(
      ALERT_TYPE.SUCCESS,
      'Registration',
      'User Registered successfully'
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('register error', error.message);
      showToast(
        ALERT_TYPE.DANGER,
        'Something Went Wrong',
        'Unable to register'
      );
    }
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    await signOut(auth);
    console.log('Logout');
    showToast(ALERT_TYPE.SUCCESS, 'SignOut', 'User Logout successfully');
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('logout error', error.message);
      showToast(ALERT_TYPE.DANGER, 'Something Went Wrong', 'Unable to logout');
      return false;
    }
    return false;
  }
};
