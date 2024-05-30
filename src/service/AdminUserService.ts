import { ref, set, child, get } from "firebase/database";
import { firebaseDb } from "@/service/FirebaseClient";
import { ProductDomain } from "@/domain/ProductDomain";

const setProduct = async (product: ProductDomain) => {
  const { category, image, id, title, options, price, description } = product;
  return set(ref(firebaseDb, "products/" + id), {
    category,
    description,
    id,
    image,
    options,
    price: parseInt(price),
    title
  });
};
const getProducts = async ({ queryKey }: any): Promise<void | ProductDomain> => {
  const dbRef = ref(firebaseDb);

  return get(child(dbRef, `products/${queryKey[1]}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val() as ProductDomain;
      } else {
        console.log("No data available");
      }
    })
    .catch(console.error);
};

const uploadProductImg = async (files: FileList) => {
  if (files) {
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET_NAME);
    return fetch(import.meta.env.VITE_CLOUDINARY_URL, {
      method: "POST",
      body: data
    }) //
      .then((res) => res.json())
      .then((data) => data.url);
  }
};

export default {
  setProduct,
  getProducts,
  uploadProductImg
};
