import { addDoc, collection, getDocs } from "firebase/firestore";
import {
  auth,
  facebookProvider,
  firestore,
  googleProvider,
} from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

// interface userProps {
//   email: string;
//   password: string;
//   name: string;
//   age: string;
// }

const useFirebaseAuth = () => {
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const readData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    } catch (error: any) {
      console.log("🚀 ~ signUp ~ error:", error.message);
      setError(error.message);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name: string,
    age: number
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setUser(user);
      if (user) {
        console.log("🚀 ~ signUp ~ user:", user);
        await addDoc(collection(firestore, "users"), {
          name,
          age,
          email,
        });
      }
    } catch (error: any) {
      console.log("🚀 ~ signUp ~ error:", error.message);
      setError(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      console.log("🚀 ~ login ~ user:", user);
    } catch (error: any) {
      console.log("🚀 ~ login ~ error:", error.message);
      setError(error.message);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.log("🚀 ~ forgotPassword ~ error:", error.message);
      setError(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
      console.log("🚀 ~ loginWithGoogle ~ userCredential.user:", user);
    } catch (error: any) {
      console.log("🚀 ~ loginWithGoogle ~ error:", error.message);
      setError(error.message);
    }
  };

  const loginWithFacebook = async () => {
    try {
      const userCredential = await signInWithPopup(auth, facebookProvider);
      setUser(userCredential.user);
    } catch (error: any) {
      console.log("🚀 ~ loginWithFacebook ~ error:", error.message);
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("🚀 ~ logged out");
    } catch (error: any) {
      console.log("🚀 ~ logout ~ error.message:", error.message);
      setError(error.message);
    }
  };

  return {
    user,
    error,
    signUp,
    login,
    forgotPassword,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    readData,
  };
};

export default useFirebaseAuth;
