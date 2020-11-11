import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/Login.js';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Convos from './pages/Convos.js';
import Match from './pages/Match.js'
import Chat from './pages/Chat.js'

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectiondata } from 'react-firebase-hooks/firestore';

// Initialize Firebase.
// firebase.initializeApp({
//   apiKey: "AIzaSyDP622JwQjjl2ZZw4E_GHnfssfB2wVGfAo",
//   authDomain: "yhacks-d4ca5.firebaseapp.com",
//   databaseURL: "https://yhacks-d4ca5.firebaseio.com",
//   projectId: "yhacks-d4ca5",
//   storageBucket: "yhacks-d4ca5.appspot.com",
//   messagingSenderId: "263899565045",
//   appId: "1:263899565045:web:ea67d20cb44d29d882aebc",
//   measurementId: "G-67PCW36YBS"
// })

function App() {
  //const [user] = useAuthState(auth);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path='/match'>
            <Match />
          </Route>
          <Route path='/convos'>
            <Convos />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/chat'>
            <Chat />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function SignIn() {
  LoginPage.SignIn();
}



export default App;
