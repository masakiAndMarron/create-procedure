import { db } from "../../firebase/Config";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { timestamp } from "../../firebase/Config";

export const createTitleInProcedure = (text, type, id, setId) => {
  switch (true) {
    case type === "Title":
      if (id === "") {
        const newProcedureRef = doc(collection(db, "temp_procedures"));
        const title = {
          title: {
            title: text,
            created_at: timestamp,
          },
        };
        setDoc(newProcedureRef, title);
        setId(newProcedureRef.id);
      }
    case type === "Phase":
      const phase = {
        phase: {
          phase: text,
          created_at: timestamp,
        },
      };
      break;
    default:
      break;
  }
};

export async function getTempProcedure(setId) {
  const querySnapshot = await getDocs(collection(db, "temp_procedures"));
  if (querySnapshot) {
    querySnapshot.forEach((doc) => {
      setId(doc.data().title.titile);
    });
  } else {
    return;
  }
}
