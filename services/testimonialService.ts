import { db } from "../firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";

export interface Testimonial {
  id?: string;
  name: string;
  content: string;
  role?: string;
  stars: number;
  avatar?: string | null;
  createdAt?: any;
}

const COLLECTION = "testimonials";

export async function addTestimonial(
  testimonial: Omit<Testimonial, "id" | "createdAt">,
) {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...testimonial,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Testimonial[];
}
