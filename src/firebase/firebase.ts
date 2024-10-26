import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBc-Lgx5QZu2_4M6kfXMWHpjfkY2agShPU",
  authDomain: "promo-pro-21485.firebaseapp.com",
  projectId: "promo-pro-21485",
  storageBucket: "promo-pro-21485.appspot.com",
  messagingSenderId: "1012726449281",
  appId: "1:1012726449281:web:34873195232f2d4517b980",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
