import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvtXoNZ_NbSXdeR_xp9DSx-6vcBCIc01A",
  authDomain: "front-end-capstone-74395.firebaseapp.com",
  projectId: "front-end-capstone-74395",
  storageBucket: "front-end-capstone-74395.appspot.com",
  messagingSenderId: "116230121299",
  appId: "1:116230121299:web:cbf6c807de48b4dbf4e3a6",
  measurementId: "G-7EWLS2NKT5"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default };

