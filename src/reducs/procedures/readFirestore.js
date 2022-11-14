import { collection, doc, getDocs, query, orderBy } from "firebase/firestore";
import { procedureRef, procedureListRef } from "./createFirestore";

// export const readProcedure = (procedureId, setProcedure) => {
//   return new Promise((resolve, reject) => {
//     //procedure_listデータを取得
//     const tempProcedureRef = getDocs(procedureListRef, procedureId);
//     resolve(tempProcedureRef);
//   }).then(function (results) {
//     return new Promise(function (resolve, reject) {
//       results.forEach((result) => {
//         const title = result.data().title.title;
//       });
//       const clumpRef = collection(doc(procedureListRef, procedureId), "clump");
//       const q = query(clumpRef, orderBy("created_at", "asc"));
//       const clumpRefs = getDocs(q);
//       resolve(clumpRefs);
//     }).then(function (results) {
//       results.forEach((result) => {
//         let phase = result.data().phase;
//         let contents = result.data().contents;
//       });
//     });
//   });
// };

export const readProcedure = (procedureId, setTitle, setClump) => {
  return new Promise((resolve, reject) => {
    //temp_procedureデータを取得
    const tempProcedureRef = getDocs(procedureListRef, procedureId);
    resolve(tempProcedureRef);
  }).then(function (results) {
    return new Promise(function (resolve, reject) {
      results.forEach((result) => {
        //titleを格納
        setTitle(result.data().title.title);
        const clumpRef = collection(
          doc(procedureListRef, procedureId),
          "clump"
        );
        //clumpデータを取得
        const q = query(clumpRef, orderBy("created_at", "asc"));
        const clumpRefs = getDocs(q);
        resolve(clumpRefs);
      });
    }).then(function (results) {
      let obj = {};
      let phaseCounter = 1;
      results.forEach((result) => {
        let phase = result.data().phase;
        let contents = result.data().contents;
        obj[phase] = {
          id: procedureId,
          contents,
        };
        phaseCounter = phaseCounter + 1;
      });
      setClump({ procedure: obj });
    });
  });
};

export const readProcedureList = (setTitles) => {
  let data = [];
  return new Promise((resolve, reject) => {
    //procedure_listデータを取得
    const tempProcedureListRef = getDocs(procedureListRef);
    resolve(tempProcedureListRef);
  }).then(function (results) {
    return new Promise(() => {
      results.forEach((result) => {
        const title = result.data().title.title;
        const titleId = result.data().title.id;
        data.push({ id: titleId, title: title });
      });
      setTitles(data);
    });
  });
};

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
        const q = query(clumpRef, orderBy("created_at", "asc"));
        const clumpRefs = getDocs(q);
        resolve(clumpRefs);
      });
    }).then(function (results) {
      let obj = {};
      let phaseCounter = 1;
      results.forEach((result) => {
        let phase = result.data().phase;
        let contents = result.data().content;
        obj[phase] = {
          id: result.id,
          contents,
        };
        phaseCounter = phaseCounter + 1;
      });
      setClump({ temp_procedure: obj });
    });
  });
};
