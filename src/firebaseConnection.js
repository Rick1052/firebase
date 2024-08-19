import { initializeaApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD30b3OElXq84bjU4uT6ee4usXy3nntT7g",
    authDomain: "persistencia-2398a.firebaseapp.com",
    projectId: "persistencia-2398a",
    storageBucket: "persistencia-2398a.appspot.com",
    messagingSenderId: "242129491838",
    appId: "1:242129491838:web:a550de5a833b1cd8a3452f"
}

const firebaseApp = initializeaApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth};