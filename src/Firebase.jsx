// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFKldWQNtGaUFLsshnHtX1Dbf5RcwiNMs",
  authDomain: "typeryder-f0cd6.firebaseapp.com",
  projectId: "typeryder-f0cd6",
  storageBucket: "typeryder-f0cd6.appspot.com",
  messagingSenderId: "996961168555",
  appId: "1:996961168555:web:c1cf55a7252a01ceab9bee",
  measurementId: "G-W112FKCHZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};

const logOut = () => {
    return signOut(auth);
};

export { auth, signInWithGoogle, logOut };
