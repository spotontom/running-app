import { Run } from "../types/types";
import { db } from "./firebaseConfig";
import { collection, doc, getDocs, orderBy, setDoc, query, where } from 'firebase/firestore';
import { generateUUID } from "../types/generateUUID";
import { auth } from "./firebaseConfig";

export const saveRun = async (partialRunData: Omit<Run, "id" | "createdAt">) => {
    const id = await generateUUID();
    const uid = auth.currentUser?.uid;

  if (!uid) {
    throw new Error("No user is currently logged in");
  }
    const fullRunData: Run = {
        ...partialRunData, 
        id,
        uid,
        createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "runs", fullRunData.id), fullRunData)
};

export const getRunsForCurrentUser = async (): Promise<Run[]> => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
        throw new Error("No user is currently logged in");
    }

    const runsRef = collection(db, "runs");
    const q = query(
        runsRef,
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const runs: Run[] = querySnapshot.docs.map((doc) => doc.data() as Run);

    return runs;
}