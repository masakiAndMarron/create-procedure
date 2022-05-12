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

export const procedureRef = collection(db, "temp_procedure");

export async function createTempProcedure(
  text,
  type,
  id,
  setId,
  clearTextarea,
  clumps,
  setClump
) {
  switch (true) {
    case type === "Title":
      if (id === "") {
        const newProcedureRef = doc(procedureRef);
        const obj = {};
        //stateの初期値
        obj["temp_procedure"] = {};
        //firestoreのデータ構成
        const data = {
          title: {
            title: text,
            created_at: timestamp,
          },
        };
        //firestore新規作成
        await setDoc(newProcedureRef, data);
        //state新規作成
        setClump(obj);
        //stateで作成したtitleのidを管理。
        setId(newProcedureRef.id);
      }
    case type === "Phase":
      const tempProcedureRef = doc(procedureRef, id);
      const newClumpRef = doc(collection(tempProcedureRef, "clump"));
      clumps["temp_procedure"][text] = [];
      //firestoreに追加する用のデータ
      const data = {
        phase: text,
        created_at: timestamp,
        updated_at: timestamp,
      };
      await setDoc(newClumpRef, data);
      setId(newClumpRef.id);
      setClump(clumps);
      clearTextarea("");
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

export async function addContent(
  titleId,
  phaseId,
  content,
  clearTextarea,
  switchContentErrorFlag,
  clumps,
  setClump
) {
  if (phaseId !== "") {
    const tempProcedureRef = doc(db, "temp_procedure", titleId);
    const clumpRef = doc(collection(tempProcedureRef, "clump"), phaseId);
    const docSnap = await getDoc(clumpRef);
    let data = {};
    if (!docSnap.data().content) {
      data.content = [content];
      clumps["temp_procedure"][docSnap.data().phase] = [content];
    } else {
      data.content = [...docSnap.data().content, content];
      clumps["temp_procedure"][docSnap.data().phase] = [
        ...docSnap.data().content,
        content,
      ];
    }
    data.updated_at = timestamp;
    updateDoc(clumpRef, data);
    setClump(clumps);
    clearTextarea("");
  } else {
    console.log("phaseを入力してください");
    switchContentErrorFlag(true);
  }
}
