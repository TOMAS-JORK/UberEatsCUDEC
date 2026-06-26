 const firebaseConfig = {
    apiKey: "AIzaSyB8ieRgcdBHqGPOv6EAD6Oc9SeL9jTfiFQ",
    authDomain: "ubereatscudecrazo.firebaseapp.com",
    projectId: "ubereatscudecrazo",
    storageBucket: "ubereatscudecrazo.firebasestorage.app",
    messagingSenderId: "631379683714",
    appId: "1:631379683714:web:2809e78de24f74d58d479b"
  };

  firebase.initializeApp(firebaseConfig);
  window.db = firebase.firestore();
  console.log("firebase.js cargado");
console.log(db);