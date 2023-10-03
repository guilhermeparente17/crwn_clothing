import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCVP9FPb2di5XEY2jCDGOc8bQQ3lj1hk2I",
    authDomain: "crwn-clothing-db-2bcbd.firebaseapp.com",
    projectId: "crwn-clothing-db-2bcbd",
    storageBucket: "crwn-clothing-db-2bcbd.appspot.com",
    messagingSenderId: "861100751610",
    appId: "1:861100751610:web:bcee3f9b0114e5ec462743"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShop = await getDoc(userDocRef);

    if (!userSnapShop.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        })
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
  }