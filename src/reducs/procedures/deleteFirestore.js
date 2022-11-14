import { timestamp } from "../../firebase/Config";
import { doc, updateDoc, collection } from "firebase/firestore";
import { procedureRef } from "./createFirestore";
import { readTempProcedure } from "./readFirestore";

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
