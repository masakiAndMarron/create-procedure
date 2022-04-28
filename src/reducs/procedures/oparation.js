import { db } from "../../firebase/Config";
import { collection, doc, setDoc } from "firebase/firestore";
import { timestamp } from "../../firebase/Config";

export const createTitleInProcedure = (text, type, id, setId) => {
  switch (true) {
    case type === "Title":
      const newProcedureRef = doc(collection(db, "procedures"));
      const title = {
        title: {
          title: text,
          created_at: timestamp,
        },
      };
      setDoc(newProcedureRef, title);
      setId(newProcedureRef.id);
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
