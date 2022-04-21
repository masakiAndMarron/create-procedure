import { auth } from "../../firebase/Config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/Config";
import { push } from "connected-react-router";

export const signUp = (mail, password, confirmPassword) => {
  return async (dispatch) => {
    return createUserWithEmailAndPassword(auth, mail, password).then(
      (userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        const timestamp = serverTimestamp();

        const userInitialData = {
          created_at: timestamp,
          mail: mail,
          uid: uid,
          updated_at: timestamp,
        };
        setDoc(doc(db, "users", uid), userInitialData);
        dispatch(push("/"));
      }
    );
  };
};

export const SignIn = (mail, password) => {
  return async (dispatch) => {
    signInWithEmailAndPassword(auth, mail, password)
      .then(() => {
        dispatch(push("/create/procedure"));
      })
      .catch((error) => {
        // 処理はいったんスキップ
      });
  };
};
