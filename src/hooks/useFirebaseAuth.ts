import { Dispatch } from '@reduxjs/toolkit';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  UserInfo,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useOnlineStatus } from '../components/Providers/OnlineStatusProvider';
import { auth, facebookProvider, firestore, googleProvider } from '../firebase/firebase';
import { resetUser, setUser } from '../store/auth/authSlice';

import { showNotification } from '../store/notification/notificationSlice';

const useFirebaseAuth = () => {
  const dispatch = useDispatch();
  const isOnline = useOnlineStatus();

  const fetchUser = async (uid: string, dispatch: Dispatch) => {
    try {
      const docRef = doc(firestore, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userInfo = {
          uid,
          email: userData.email || '',
          displayName: `${userData.firstName} ${userData.lastName}` || userData.displayName || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          age: userData.age || '',
          photoURL: userData.photoURL || '',
        };

        localStorage.setItem('user', JSON.stringify(userInfo));
        dispatch(setUser(userInfo));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUser(user.uid, dispatch);
      } else {
        dispatch(resetUser());
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (!auth.currentUser) return;

    if (isOnline) {
      fetchUser(auth.currentUser.uid, dispatch);
    } else {
      const cachedUser = localStorage.getItem('user');
      cachedUser && dispatch(setUser(JSON.parse(cachedUser)));
    }
  }, [dispatch, isOnline]);

  const handleAuthSuccess = async (user: UserInfo, message: string) => {
    const docRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    let userData = docSnap.data();

    if (!userData) {
      userData = {
        uid: user.uid,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        age: null,
        email: user.email || '',
        photoURL: user.photoURL || '',
        articles: [],
      };
      await setDoc(docRef, userData);
    }

    const userInfo = {
      uid: user.uid,
      email: user.email || '',
      displayName: `${userData.firstName} ${userData.lastName}`,
      photoURL: userData.photoURL || '',
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      age: userData?.age || '',
    };

    localStorage.setItem('user', JSON.stringify(userInfo));

    dispatch(setUser(userInfo));

    dispatch(
      showNotification({
        message,
        severity: 'success',
      }),
    );
  };

  const handleAuthError = (error: Error) => {
    const message = error.message;
    dispatch(
      showNotification({
        message,
        severity: 'error',
      }),
    );
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    age: number,
  ) => {
    if (!isOnline) {
      dispatch(
        showNotification({
          message: 'No internet connection. Please try again later.',
          severity: 'error',
        }),
      );
      return false;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      if (user) {
        await setDoc(doc(firestore, 'users', user.uid), {
          uid: user.uid,
          firstName,
          lastName,
          age,
          email,
          photoURL: '',
          articles: [],
        });

        handleAuthSuccess(user, 'Your account has been created successfully. Welcome aboard!');

        return true;
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const login = async (email: string, password: string) => {
    if (!isOnline) {
      dispatch(
        showNotification({
          message: 'No internet connection. Try again later.',
          severity: 'warning',
        }),
      );

      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess(userCredential.user, 'You have successfully logged in. Welcome back!');
    } catch (error) {
      handleAuthError(error);
    }
  };

  const forgotPassword = async (email: string) => {
    if (!isOnline) {
      dispatch(
        showNotification({
          message: 'No internet connection. Please try again later.',
          severity: 'error',
        }),
      );
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      dispatch(
        showNotification({
          message:
            'A password reset email has been sent to your email address. Please check your inbox.',
          severity: 'success',
        }),
      );
    } catch (error) {
      handleAuthError(error);
    }
  };

  const loginWithProvider = async (
    provider: GoogleAuthProvider | FacebookAuthProvider,
    message: string,
  ) => {
    if (!isOnline) {
      dispatch(
        showNotification({
          message: 'No internet connection. Please try again later.',
          severity: 'error',
        }),
      );
      return;
    }

    try {
      const userCredential = await signInWithPopup(auth, provider);
      handleAuthSuccess(userCredential.user, message);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const loginWithGoogle = () =>
    loginWithProvider(googleProvider, 'You have successfully logged in with Google. Welcome back!');

  const loginWithFacebook = () =>
    loginWithProvider(
      facebookProvider,
      'You have successfully logged in with Facebook. Welcome back!',
    );

  const logout = async () => {
    if (!isOnline) {
      dispatch(
        showNotification({
          message: 'No internet connection. Please try again later.',
          severity: 'warning',
        }),
      );
      return;
    }

    try {
      await signOut(auth);
      dispatch(resetUser());
      localStorage.removeItem('user');
    } catch (error) {
      handleAuthError(error);
    }
  };

  return {
    signUp,
    login,
    forgotPassword,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  };
};

export default useFirebaseAuth;
