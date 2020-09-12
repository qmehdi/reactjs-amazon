import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_TaJQ9yK_Csk4qUsOnUjHwGi1X3cQ-L0",
  authDomain: "clone-2241f.firebaseapp.com",
  databaseURL: "https://clone-2241f.firebaseio.com",
  projectId: "clone-2241f",
  storageBucket: "clone-2241f.appspot.com",
  messagingSenderId: "759509549443",
  appId: "1:759509549443:web:e1e8638a3df0de94b7f6b6",
  measurementId: "G-PK81TWY4EF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize DB
const db = firebaseApp.firestore();

// Gives us a variable that we can use for signing in and stuff
const auth = firebase.auth();

export { db, auth };
