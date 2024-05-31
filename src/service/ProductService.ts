import { child, get, ref } from "firebase/database";
import { firebaseDb } from "@/service/FirebaseClient";
import { ProductDomain } from "@/domain/ProductDomain";

const getProducts = async () => {
  const dbRef = ref(firebaseDb);

  return get(child(dbRef, `products`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()) as ProductDomain[];
      } else {
        console.log("No data available");
      }
    })
    .catch(console.error);
};

export default {
  getProducts
};
