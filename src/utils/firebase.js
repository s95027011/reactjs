import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: "AIzaSyAf5-aaD-5X0ad6s3AXN613UkQ8HJ4kn68",
    authDomain: "cat-game-ca867.firebaseapp.com",
    projectId: "cat-game-ca867",
    storageBucket: "cat-game-ca867.appspot.com",
    messagingSenderId: "227093191474",
    appId: "1:227093191474:web:b461fde64d9fd8c0b0d52b"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;