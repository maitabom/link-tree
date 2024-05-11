import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxU0kKYTRzXej1-UruhhYo3Mze1267ZRU",
  authDomain: "link-tree-47455.firebaseapp.com",
  projectId: "link-tree-47455",
  storageBucket: "link-tree-47455.appspot.com",
  messagingSenderId: "178960170027",
  appId: "1:178960170027:web:84edb8170ad262c7bd7e6e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const datastore = getFirestore(app);

export { auth, datastore };
