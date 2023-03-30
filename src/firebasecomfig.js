import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1MddUPGnzVXd3to6T1MuzHfSojnsv2W4",
  authDomain: "make-my-trip-ee9f0.firebaseapp.com",
  projectId: "make-my-trip-ee9f0",
  storageBucket: "make-my-trip-ee9f0.appspot.com",
  messagingSenderId: "946680143919",
  appId: "1:946680143919:web:c9b377670713ffceeee6da",
  measurementId: "G-26QWWBYLTL"
};

const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 export {app, auth} ;

