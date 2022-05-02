import { db } from "../../firebase/Config";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  getDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { timestamp } from "../../firebase/Config";

const procedureRef = collection(db, "temp_procedure");

export async function createTempProcedure(text, type, id, setId) {
  switch (true) {
    case type === "Title":
      if (id === "") {
        const newProcedureRef = doc(procedureRef);
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
      const tempProcedureRef = doc(procedureRef, id);
      const newClumpRef = doc(collection(tempProcedureRef, "clump"));
      const data = {
        phase: text,
        created_at: timestamp,
        updated_at: timestamp,
      };
      await setDoc(newClumpRef, data);
      setId(newClumpRef.id);
      break;
    default:
      break;
  }
}

export async function getTempProcedureId(setTitleId) {
  const querySnapshot = await getDocs(procedureRef);
  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      setTitleId(doc.id);
    });
  } else {
    return;
  }
}

export async function getClumpId(titleId, setClumpId) {
  const clumpRef = collection(doc(procedureRef, titleId), "clump");
  const q = query(clumpRef, orderBy("updated_at", "desc"), limit(1));
  const querySnapShot = await getDocs(q);
  let id = "";
  querySnapShot.forEach((snapshot) => {
    id = snapshot.id;
  });
  setClumpId(id);
}

export async function addContent(titleId, phaseId, content) {
  if (phaseId !== "") {
    const tempProcedureRef = doc(db, "temp_procedure", titleId);
    const clumpRef = doc(collection(tempProcedureRef, "clump"), phaseId);
    const docSnap = await getDoc(clumpRef);
    let data = {};
    if (!docSnap.data().content) {
      data.content = [content];
    } else {
      data.content = [...docSnap.data().content, content];
    }
    data.updated_at = timestamp;
    updateDoc(clumpRef, data);
  } else {
    console.log("phaseIdが空です");
  }
}
