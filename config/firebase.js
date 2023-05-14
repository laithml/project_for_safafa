const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyCLLEB1z3CyQhnEs7VPLTBCJd4x1bqsMUo",
  authDomain: "beitsafafa-f576f.firebaseapp.com",
  projectId: "beitsafafa-f576f",
  storageBucket: "beitsafafa-f576f.appspot.com",
  messagingSenderId: "761426535007",
  appId: "1:761426535007:web:259a2410b6c25d740531ea",
  measurementId: "G-T9896J8W74",
};

const app_db = initializeApp(firebaseConfig);
exports.db = getFirestore(app_db);
exports.auth = getAuth(app_db);
