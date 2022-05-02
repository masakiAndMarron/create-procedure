import { db, timestamp } from "../../firebase/Config";
import { collection, doc, getDocs } from "firebase/firestore";
import { procedureRef } from "./createFirestore";

export const readTempProcedure = (title, clump, setTitle, setClump) => {
  return new Promise((resolve, reject) => {
    //temp_procedureデータを取得
    const tempProcedureRef = getDocs(procedureRef);
    resolve(tempProcedureRef);
  }).then(function (results) {
    return new Promise(function (resolve, reject) {
      results.forEach((result) => {
        //titleを格納
        setTitle(result.data().title.title);
        const clumpRef = collection(doc(procedureRef, result.id), "clump");
        //clumpデータを取得
        const clumpRefs = getDocs(clumpRef);
        resolve(clumpRefs);
      });
    }).then(function (results) {
      results.forEach((result) => {
        //phase:{content}形式で作成
        setClump({ ...clump, [result.data().phase]: [result.data().content] });
      });
    });
  });
};
