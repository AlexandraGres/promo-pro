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
import {
  auth,
  facebookProvider,
  firestore,
  googleProvider,
} from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { resetUser, setUser } from '../store/auth/authSlice';

import { getErrorMessage } from '../utils';
import { showNotification } from '../store/notification/notificationSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

interface Error {
  code?: string;
  message: string;
}

const useFirebaseAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();

        dispatch(
          setUser({
            uid: user.uid,
            email: user.email || '',
            displayName:
              `${userData?.firstName} ${userData?.lastName}` ||
              userData?.displayName ||
              '',
            photoURL: userData?.photoURL || '',
          })
        );
      } else {
        dispatch(resetUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleAuthSuccess = async (user: UserInfo, message: string) => {
    const docRef = doc(firestore, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    dispatch(
      setUser({
        uid: user.uid,
        email: user.email || '',
        displayName:
          `${userData?.firstName} ${userData?.lastName}` ||
          userData?.displayName ||
          '',
        photoURL: userData?.photoURL || '',
      })
    );
    dispatch(
      showNotification({
        message,
        severity: 'success',
      })
    );
  };

  const handleAuthError = (error: Error) => {
    const message = error.code ? getErrorMessage(error.code) : error.message;
    dispatch(
      showNotification({
        message,
        severity: 'error',
      })
    );
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    age: number
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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

        handleAuthSuccess(
          user,
          'Your account has been created successfully. Welcome aboard!'
        );

        return true;
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      handleAuthSuccess(
        userCredential.user,
        'You have successfully logged in. Welcome back!'
      );
    } catch (error) {
      handleAuthError(error);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      dispatch(
        showNotification({
          message:
            'A password reset email has been sent to your email address. Please check your inbox.',
          severity: 'success',
        })
      );
    } catch (error) {
      handleAuthError(error);
    }
  };

  const loginWithProvider = async (
    provider: GoogleAuthProvider | FacebookAuthProvider,
    message: string
  ) => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      handleAuthSuccess(userCredential.user, message);
    } catch (error) {
      handleAuthError(error);
    }
  };

  const loginWithGoogle = () =>
    loginWithProvider(
      googleProvider,
      'You have successfully logged in with Google. Welcome back!'
    );

  const loginWithFacebook = () =>
    loginWithProvider(
      facebookProvider,
      'You have successfully logged in with Facebook. Welcome back!'
    );

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(resetUser());
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
