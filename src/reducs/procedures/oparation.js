import { db } from "../../firebase/Config";
import { collection, doc, setDoc } from "firebase/firestore";
import { timestamp } from "../../firebase/Config";

export const createTitleInProcedure = (title) => {
  const newProcedureRef = doc(collection(db, "procedures"));
  const data = {
    title: {
      title: title,
      created_at: timestamp,
    },
  };

  setDoc(newProcedureRef, data);
};
