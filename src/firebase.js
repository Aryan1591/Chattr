
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp =firebase.initializeApp({
  
        apiKey: "AIzaSyDLTTWomwSyghbPPC5k_V54dM8P78ZbcPE",
        authDomain: "messenger-clone-e0b61.firebaseapp.com",
        projectId: "messenger-clone-e0b61",
        storageBucket: "messenger-clone-e0b61.appspot.com",
        messagingSenderId: "748826397202",
        appId: "1:748826397202:web:9a1bcf1aafe0e4da8626cb",
        measurementId: "G-D26XS620W3"
     
});

const db= firebaseApp.firestore();

export default db; 

