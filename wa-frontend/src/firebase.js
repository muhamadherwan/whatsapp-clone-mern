const firebaseConfig = {
    apiKey: "AIzaSyAH8DyF28exlbxoYRmvswUIJKAAa5F9YSE",
    authDomain: "whatsapp-clone-879ec.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-879ec.firebaseio.com",
    projectId: "whatsapp-clone-879ec",
    storageBucket: "whatsapp-clone-879ec.appspot.com",
    messagingSenderId: "921333342583",
    appId: "1:921333342583:web:f75b133a7b916a3de48172",
    measurementId: "G-PE0K7GGMZZ"
  };

  const firebaseApp = firebase.initializeApp
  (firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;