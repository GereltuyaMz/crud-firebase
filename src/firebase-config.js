// connnect the firebase
import { initializeApp } from "firebase/app";
// connect to firestore
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBBfKWZA04aVj_C76ie0E63MWAZc792sU8",
	authDomain: "crud-firebase-6ce54.firebaseapp.com",
	projectId: "crud-firebase-6ce54",
	storageBucket: "crud-firebase-6ce54.appspot.com",
	messagingSenderId: "239570852182",
	appId: "1:239570852182:web:4f6530ed994d9093081ef7",
	measurementId: "G-CS44PFJC94",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
