import { db } from "../firebase.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const COLLECTION = "testimonials";

export async function deleteAllTestimonials() {
  const snapshot = await getDocs(collection(db, COLLECTION));
  const batch = [];
  for (const d of snapshot.docs) {
    batch.push(deleteDoc(doc(db, COLLECTION, d.id)));
  }
  await Promise.all(batch);
}
