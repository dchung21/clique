import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyDP622JwQjjl2ZZw4E_GHnfssfB2wVGfAo",
  	authDomain: "yhacks-d4ca5.firebaseapp.com",
  	databaseURL: "https://yhacks-d4ca5.firebaseio.com",
  	projectId: "yhacks-d4ca5",
  	storageBucket: "yhacks-d4ca5.appspot.com",
  	messagingSenderId: "263899565045",
  	appId: "1:263899565045:web:ea67d20cb44d29d882aebc",
  	measurementId: "G-67PCW36YBS"
})

export const auth = app.auth();
export default app;
