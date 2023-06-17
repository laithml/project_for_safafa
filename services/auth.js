import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

export const SignUpFireBase = async (email, password, fullName, phoneNumber) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        const userRef = doc(db, "users", userCredential.user.uid);
        const userDetails = {
            id: userCredential.user.uid,
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
        };
        await setDoc(userRef, userDetails);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};


export const LoginFireBase = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("success");
        return userCredential.user; // return user object
    } catch (error) {
        console.log(error);
        return false;
    }
};




export const forgetPasswordHandler = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return true;
    } catch (error) {
        return false;
    }
};
