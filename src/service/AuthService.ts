import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { UserDomain } from "@/domain/UserDomain";
import UserService from "@/service/UserService";

const auth = getAuth();
const provider = new GoogleAuthProvider();
// ↓ 자동로그인 방지
// provider.setCustomParameters({ prompt: "select_account" });

const login = () => {
  return signInWithPopup(auth, provider);
};

const logout = () => {
  return signOut(auth);
};

const getUser = async (): Promise<UserDomain | undefined | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        localStorage.setItem(import.meta.env.VITE_FIREBASE_ACCESS_TOKEN, await user.getIdToken());
        localStorage.setItem(import.meta.env.VITE_FIREBASE_REFRESH_TOKEN, user.refreshToken);
        localStorage.setItem(import.meta.env.VITE_ROLE, await UserService.getUserRole(user.uid));
        resolve({
          name: user.displayName!,
          uid: user.uid,
          email: user.email!,
          role: await UserService.getUserRole(user.uid)
        });
      } else {
        localStorage.removeItem(import.meta.env.VITE_FIREBASE_ACCESS_TOKEN);
        localStorage.removeItem(import.meta.env.VITE_FIREBASE_REFRESH_TOKEN);
        localStorage.removeItem(import.meta.env.VITE_ROLE);
        resolve(null);
      }
    });
  });
};

export default {
  login,
  logout,
  getUser
};
