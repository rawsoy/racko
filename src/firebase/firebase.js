import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAVVM_f64E7HYdhlqKlh5BRZoKnouKrj3Q",
  authDomain: "racko-7f530.firebaseapp.com",
  projectId: "racko-7f530",
  storageBucket: "racko-7f530.appspot.com",
  messagingSenderId: "835485488396",
  appId: "1:835485488396:web:c5d2e8e1b40c581574a529"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

