import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export const SignUpFireBase = (email, password, fullName, phoneNumber) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      const userRef = doc(db, "users", userCredential.user.uid);
      const userDetails = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      };
      setDoc(userRef, userDetails).then(() => {
        console.log("Document written with ID: ", userRef.id);
        return true;
      });
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return false;
};

export const LoginFireBase = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  return false;
};

export const forgetPasswordHandler = () => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
  return false;
};
