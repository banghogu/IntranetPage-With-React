import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";  
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxE2Wf5DsUnqtvEPkDcuiXe0sOHiBkq6A",
  authDomain: "intranet-41b26.firebaseapp.com",
  projectId: "intranet-41b26",
  storageBucket: "intranet-41b26.appspot.com",
  messagingSenderId: "910163893952",
  appId: "1:910163893952:web:bbb6dc9cc7228b9f541725",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);

