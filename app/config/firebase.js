import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import { getAuth } from "firebase/auth";

// App's configuration
const firebaseConfig = {
  apiKey: "Insert api key",
  authDomain: "Insert auth domain",
  projectId: "Insert project id",
  storageBucket: "Insert storage bucket",
  messagingSenderId: "Insert messaging sender id",
  appId: "Insert app id",
};

// Initialize app
const Firebase = initializeApp(firebaseConfig);
const auth = getAuth(Firebase);

export default Firebase;
