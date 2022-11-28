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
import { deleteTempProcedure } from "./deleteFirestore";

//手順書作成画面で使用
export const procedureRef = collection(db, "temp_procedure");

//手順書一覧画面で使用
export const procedureListRef = collection(db, "procedure_list");

// ログ画面で使用
export const procedureLogRef = collection(db, "procedure_log");

export async function createTempTitle(text, setTitleId, setClump) {
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
  setTitleId(newProcedureRef.id);
}

export async function createTempPhase(
  id,
  text,
  setClumpId,
  setClump,
  clearTextarea,
  clumps,
  switchPhaseErrorFlag,
  switchContentErrorFlag
) {
  // Titleが作成されていなかったら
  if (id === "") {
    switchPhaseErrorFlag(true);
    clearTextarea("");
    return;
  }
  const tempProcedureRef = doc(procedureRef, id);
  const newClumpRef = doc(collection(tempProcedureRef, "clump"));
  clumps["temp_procedure"][text] = [];
  //firestoreに追加する用のデータ
  const data = {
    phase: text,
    created_at: timestamp,
    updated_at: timestamp,
    clump_id: newClumpRef.id,
  };
  await setDoc(newClumpRef, data);
  setClumpId(newClumpRef.id);
  setClump(clumps);
  clearTextarea("");
  switchContentErrorFlag(false);
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
  const q = query(clumpRef, orderBy("created_at", "desc"), limit(1));
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
  if (phaseId === "") {
    switchContentErrorFlag(true);
    clearTextarea("");
    return;
  }
  const tempProcedureRef = doc(db, "temp_procedure", titleId);
  const clumpRef = doc(collection(tempProcedureRef, "clump"), phaseId);
  const docSnap = await getDoc(clumpRef);
  let data = {};
  let tempObj = { ...clumps };
  //コンテンツの識別子としてランダムな文字列を生成
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 16;
  const uniqueKey = Array.from(crypto.getRandomValues(new Uint8Array(N)))
    .map((n) => S[n % S.length])
    .join("");

  if (!docSnap.data().content) {
    data.content = [{ content: content, id: uniqueKey }];
    tempObj["temp_procedure"][docSnap.data().phase].contents = [
      { content: content, id: uniqueKey },
    ];
  } else {
    data.content = [
      ...docSnap.data().content,
      { content: content, id: uniqueKey },
    ];
    tempObj["temp_procedure"][docSnap.data().phase].contents = [
      ...docSnap.data().content,
      { content: content, id: uniqueKey },
    ];
  }
  data.updated_at = timestamp;
  updateDoc(clumpRef, data);
  setClump(tempObj);
  clearTextarea("");
}

function generateRandomString() {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 16;
  const uniqueKey = Array.from(crypto.getRandomValues(new Uint8Array(N)))
    .map((n) => S[n % S.length])
    .join("");
  return uniqueKey;
}

export async function createProcedure(tempProcedureId) {
  //procedure_listのコレクション用変数の宣言
  let newProcedureListRef;

  return new Promise((resolve) => {
    //temp_procedureデータを取得
    const tempProcedureRef = getDocs(procedureRef);
    resolve(tempProcedureRef);
  }).then(function (results) {
    return new Promise(function (resolve, reject) {
      results.forEach((result) => {
        //titleを格納
        const title = result.data().title.title;
        //procedure_listのドキュメント用Idを生成
        let procedureId = generateRandomString();
        //procedure_listドキュメントを新規作成
        newProcedureListRef = doc(procedureListRef, procedureId);

        //procedure_listのフィールドに追加するデータを作成
        const data = {
          title: {
            title: title,
            created_at: timestamp,
            id: procedureId,
          },
        };

        setDoc(newProcedureListRef, data);

        //temp_procedureからデータを取得
        const tempClumpRef = collection(doc(procedureRef, result.id), "clump");
        const q = query(tempClumpRef, orderBy("created_at", "asc"));
        const clumpRefs = getDocs(q);
        resolve(clumpRefs);
      });
    }).then(async function (results) {
      results.forEach(async (result) => {
        //clumpコレクション用idを生成
        let clumpId = generateRandomString();
        const clumpListRef = doc(
          collection(newProcedureListRef, "clump"),
          clumpId
        );
        const data = {
          phase: result.data().phase,
          contents: result.data().content,
          created_at: timestamp,
          updated_at: timestamp,
          clump_id: clumpListRef.id,
        };
        console.log(data);
        await setDoc(clumpListRef, data);
      });
      await deleteTempProcedure(tempProcedureId);
    });
  });
}

export async function createLog(title, procedureResult) {
  let newProcedureLogRef;
  let procedureLogId = generateRandomString();
  //procedure_logドキュメントを新規作成
  newProcedureLogRef = doc(procedureLogRef, procedureLogId);
  //procedure_logのフィールドに追加するデータを作成
  const titleData = {
    title: {
      title: title,
      created_at: timestamp,
      id: procedureLogId,
    },
  };

  setDoc(newProcedureLogRef, titleData);

  Object.keys(procedureResult["procedure"]).map(async function (phaseName) {
    let clumpId = generateRandomString();
    let clumpListRef = await doc(
      collection(newProcedureLogRef, "clump"),
      clumpId
    );
    let clumpData = {
      phase: phaseName,
      create_at: timestamp,
      clump_id: clumpId,
      contents: {},
    };
    let contents = [];
    procedureResult["procedure"][phaseName].contents.map((content) => {
      let contentsValue = {
        content: content.content,
        id: content.id,
        memo: content.memo,
        result: content.result,
      };
      contents.push(contentsValue);
    });
    clumpData.contents = contents;
    await setDoc(clumpListRef, clumpData);
  });
}
