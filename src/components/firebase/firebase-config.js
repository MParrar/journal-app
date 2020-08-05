import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBN38H9Fw3zBoGXaFyhUdTmyc6FIWFa7co",
    authDomain: "react-app-cursos-597ae.firebaseapp.com",
    databaseURL: "https://react-app-cursos-597ae.firebaseio.com",
    projectId: "react-app-cursos-597ae",
    storageBucket: "react-app-cursos-597ae.appspot.com",
    messagingSenderId: "89740230534",
    appId: "1:89740230534:web:d395afae2e960ceaf77607"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}