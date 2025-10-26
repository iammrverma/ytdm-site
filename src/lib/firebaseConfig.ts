import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBsmU2IokuwCHDKcby_-XBJquFl159Uv3Y",
  authDomain: "ytdm-979ff.firebaseapp.com",
  projectId: "ytdm-979ff",
  storageBucket: "ytdm-979ff.firebasestorage.app",
  messagingSenderId: "692717907751",
  appId: "1:692717907751:web:d74d60829f9bffd0b18302",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
