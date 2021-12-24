import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCMU7E0AymawZJYhU3hiF3xnA6Ee1mrRBA",
	authDomain: "clone-66176.firebaseapp.com",
	projectId: "clone-66176",
	storageBucket: "clone-66176.appspot.com",
	messagingSenderId: "238218288087",
	appId: "1:238218288087:web:b1294a452730f0b3cf0992",
	measurementId: "G-1TTV06VLZE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
