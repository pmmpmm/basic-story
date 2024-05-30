import { UserDomain, UserRole } from "@/domain/UserDomain";
import { firebaseDb } from "@/service/FirebaseClient";
// import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID
// };

// const app = initializeApp(firebaseConfig);
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

const onUserStateChange = async (): Promise<UserDomain | null> => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        resolve({
          name: user.displayName!,
          uid: user.uid,
          email: user.email!,
          role: await getUserRole(user.uid)
        });
      } else {
        resolve(null);
      }
    });
  });
};

// const onUserStateChange = (callback: (userInfo: UserDomain) => void) => {
//   onAuthStateChanged(auth, async (user) => {
//     // user값이 존재하는지 체크한다.
//     // role를 조회한다
//     // Then을 사용해서 UserDomain을 반환
//     // if (user) {
//     //   getUser(user.uid).then((respons) => {
//     //     callback({
//     //       name: user.displayName!,
//     //       uid: user.uid,
//     //       email: user.email!,
//     //       role: respons.role
//     //     });
//     //   });
//     // }

//     // await을 사용해서 UserDomain을 반환
//     if (user) {
//       // user를 userDomain 매핑
//       // userComain에 role를 매핑
//       // userDomain을 반환한다.
//       callback({
//         name: user.displayName!,
//         uid: user.uid,
//         email: user.email!,
//         role: await getUser(user.uid)
//       });
//     }
//   });
// };

const getUserRole = async (uid: string): Promise<UserRole> => {
  const dbRef = ref(firebaseDb);
  return get(child(dbRef, `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().role;
      } else {
        console.log("No data available");
      }
    })
    .catch(console.error);
};
