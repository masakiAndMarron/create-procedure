import { timestamp } from "../../firebase/Config";
import {
  doc,
  updateDoc,
  collection,
  deleteDoc,
  deleteField,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { procedureRef } from "./createFirestore";
import { readTempProcedure } from "./readFirestore";
import { procedureListRef } from "./createFirestore";
import { readProcedureList } from "./readFirestore";

async function deleteIndividualDoc(id, procedureRefType) {
  let pRef = procedureRefType;
  const clumpRefs = await getDocs(collection(doc(pRef, id), "clump"));

  clumpRefs.forEach(async function (clump) {
    const clumpRef = doc(
      collection(doc(pRef, id), "clump"),
      clump.data().clump_id
    );
    await deleteDoc(clumpRef);
  });
}

export async function deleteTempProcedure(id) {
  deleteIndividualDoc(id, procedureRef);
  await deleteDoc(doc(procedureRef, id));
}

export async function deleteProcedure(id, setTitles) {
  deleteIndividualDoc(id, procedureListRef);
  await deleteDoc(doc(procedureListRef, id));
  readProcedureList(setTitles);
}

export async function deleteContent(
  titleId,
  phaseId,
  contentId,
  contentList,
  setTitle,
  setClump
) {
  const clumpRef = doc(
    collection(doc(procedureRef, titleId), "clump"),
    phaseId
  );

  //stateのcontentsからidが一致するものを削除
  let newContentArray = contentList.contents.filter(
    (item) => item.id !== contentId
  );

  await updateDoc(clumpRef, {
    content: newContentArray,
    updated_at: timestamp,
  });

  readTempProcedure(setTitle, setClump);
}
