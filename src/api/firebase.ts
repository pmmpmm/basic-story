import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
// ↓ 자동로그인 방지
provider.setCustomParameters({ prompt: "select_account" });

const login = () => {
  signInWithPopup(auth, provider).catch(console.error);
};

const logout = () => {
  signOut(auth).catch(console.error);
};

const onUserStateChange = (callback: (user: User | null) => void) => {
  onAuthStateChanged(auth, (user) => {
    callback(user as User | null);
  });
};

const db = getDatabase(app);
const adminUser = async () => {
  const dbRef = ref(db);
  return get(child(dbRef, "users"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch(console.error);
};
const test = async () => {};
test();

export type UserInfo = User;
export default { login, logout, onUserStateChange, adminUser };
