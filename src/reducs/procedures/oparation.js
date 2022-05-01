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
        const data = {
          title: {
            title: text,
            created_at: timestamp,
          },
        };
        await setDoc(newProcedureRef, data);
        setId(newProcedureRef.id);
      }
    case type === "Phase":
      const tempProcedureRef = doc(db, "temp_procedure", id);
      const newClumpRef = doc(collection(tempProcedureRef, "clump"));
      const data = {
        phase: text,
        created_at: timestamp,
      };
      await setDoc(newClumpRef, data);
      setId(newClumpRef.id);
      break;
    default:
      break;
  }
}

export async function addContent(titleId, phaseId, content) {
  if (phaseId !== "") {
    console.log(phaseId);
    const tempProcedureRef = doc(db, "temp_procedure", titleId);
    const clumpRef = doc(collection(tempProcedureRef, "clump"));
    const querySnapshot = await getDocs(collection(tempProcedureRef, "clump"));
    querySnapshot.forEach((doc) => {
      const existingContent = doc.data().content;
      const data = {
        content: [...existingContent, content],
      };
      console.log(data);
      // contentを追加しようとしているけどできない
      //   setDoc(clumpRef, data);
    });
  } else {
    console.log("phaseIdが空です");
  }
}

export async function getTempProcedureId(setTitleId) {
  const querySnapshot = await getDocs(collection(db, "temp_procedure"));
  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      setTitleId(doc.id);
    });
  } else {
    return;
  }
}
