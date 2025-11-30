import { doc, getDoc, setDoc, getFirestore, query, collection, where, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, User } from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBsmU2IokuwCHDKcby_-XBJquFl159Uv3Y",
  authDomain: "ytdm-979ff.firebaseapp.com",
  projectId: "ytdm-979ff",
  storageBucket: "ytdm-979ff.firebasestorage.app",
  messagingSenderId: "692717907751",
  appId: "1:692717907751:web:d74d60829f9bffd0b18302",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firestore
const db = getFirestore(app); // <-- THIS is your db

// Create or update creator
async function createOrUpdateCreator(user: User) {
  if (!user) return;

  const creatorRef = doc(db, "creators", user.uid);
  const docSnap = await getDoc(creatorRef);

  if (!docSnap.exists()) {
    await setDoc(creatorRef, {
      name: user.displayName,
      photoURL: user.photoURL,
      //TODO: displayname + random doesnt ensure absolute uniquiness
      slug:
        user.displayName?.toLowerCase().replace(/\s+/g, "-") +
        String(Math.floor(Math.random() * 1000)),
      niche: "",
      subscribers: "",
      location: "",
      bio: "",
      openForCollab: false,
      collabTypes: [],
      socials: {},
    });
  }
}

async function getCreatorBySlug(slug: string) {
  const q = query(collection(db, "creators"), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    const data = snapshot.docs[0].data();
    console.log(data)
    return { id: snapshot.docs[0].id, ...data };
  }
  console.log("No creator found: getCreatorBySlug");
  return null;
}

async function updateCreator(creatorId: string, updates: any) {
  const creatorRef = doc(db, "creators", creatorId);
  await setDoc(creatorRef, updates, { merge: true });
}

export { auth, provider, db, createOrUpdateCreator, getCreatorBySlug, updateCreator };
