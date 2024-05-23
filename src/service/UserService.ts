import { child } from "firebase/database";
import { get } from "firebase/database";
import { UserRole } from "@/domain/UserDomain";
import { ref } from "firebase/database";
import { firebaseDb } from "./FirebaseClient";

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

export default {
  getUserRole
};
