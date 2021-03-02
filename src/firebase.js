import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDtz3KVRuLkBeCFVU8Mt7P00Gvpb4Pctuo",
  authDomain: "slack-clone-557d8.firebaseapp.com",
  projectId: "slack-clone-557d8",
  storageBucket: "slack-clone-557d8.appspot.com",
  messagingSenderId: "72939635308",
  appId: "1:72939635308:web:4db630387070bf94a38e49"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };