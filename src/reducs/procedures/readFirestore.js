import { db, timestamp } from "../../firebase/Config";
import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import { procedureRef } from "./createFirestore";

export const readTempProcedure = (setTitle, setClump) => {
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
        const q = query(clumpRef, orderBy("updated_at", "asc"));
        const clumpRefs = getDocs(q);
        resolve(clumpRefs);
      });
    }).then(function (results) {
      let obj = {};
      results.forEach((result) => {
        let phase = result.data().phase;
        let content = result.data().content;
        obj[phase] = {
          id: result.id,
          content: content,
        };
      });
      console.log(obj);
      setClump({ temp_procedure: obj });
    });
  });
};
