import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA3U8X0K-NQR6jD8AdEh3d0gUUjNJorGro",
  authDomain: "test-225cd.firebaseapp.com",
  projectId: "test-225cd",
  storageBucket: "test-225cd.appspot.com",
  messagingSenderId: "303060044341",
  appId: "1:303060044341:web:88795563a809dda2d2bf7c",
  measurementId: "G-VB2DNDM7FR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
export default app;
