import { db } from "../../firebase/Config";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { timestamp } from "../../firebase/Config";

export async function createTempProcedure(text, type, id, setId) {
  switch (true) {
    case type === "Title":
      if (id === "") {
        const newProcedureRef = doc(collection(db, "temp_procedure"));
        const title = {
          title: {
            title: text,
            created_at: timestamp,
          },
        };
        await setDoc(newProcedureRef, title);
        setId(newProcedureRef.id);
      }
    case type === "Phase":
      const phase = {
        phase: {
          phase: text,
          created_at: timestamp,
        },
      };
      await updateDoc(doc(db, "temp_procedure", id), phase);
      break;
    default:
      break;
  }
}

export async function getTempProcedure(setId) {
  const querySnapshot = await getDocs(collection(db, "temp_procedure"));
  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      setId(doc.id);
    });
  } else {
    return;
  }
}
