import { initializeApp } from "@firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyg3S7tvYWgiZIh-ToA7EaRD3jQXbA_DI",
  authDomain: "react-1-89e39.firebaseapp.com",
  databaseURL: "https://react-1-89e39-default-rtdb.firebaseio.com",
  projectId: "react-1-89e39",
  storageBucket: "react-1-89e39.appspot.com",
  messagingSenderId: "1045660551158",
  appId: "1:1045660551158:web:184911dde660b28494e9d7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
