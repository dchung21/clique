// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import LoginPage from './pages/Login.js';
// import Home from './pages/Home.js';
// import Profile from './pages/Profile.js';
// import Convos from './pages/Convos.js';
// import Match from './pages/Match.js'
// import Chat from './pages/Chat.js'

import React from "react";
import Signup from "./pages/Signup.js";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import PrivateRoute from "./PrivateRoute.js";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectiondata } from 'react-firebase-hooks/firestore';

function App() {
  //const [user] = useAuthState(auth);

  return (
    
      <Container className = "d-flex align-items-center justify-content-center"
      style = {{ minHeight: "100vh" }}
      >

        <div className = "w-100" style = {{ maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path = "/" component = {Home} />
                <Route path = "/signup" component = {Signup} />
                <Route path = "/login" component = {Login} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  )

  // return (
  //   <Router>
  //     <div className="App">
  //       <header className="App-header">
  //       </header>
  //       <Switch>
  //         <Route path="/home">
  //           <Home />
  //         </Route>
  //         <Route path='/match'>
  //           <Match />
  //         </Route>
  //         <Route path='/convos'>
  //           <Convos />
  //         </Route>
  //         <Route path='/profile'>
  //           <Profile />
  //         </Route>
  //         <Route path='/chat'>
  //           <Chat />
  //         </Route>
  //         <Route path="/">
  //           <LoginPage />
  //         </Route>
  //       </Switch>
  //     </div>
  //   </Router>
  // );
}

// function SignIn() {
//   LoginPage.SignIn();
// }



export default App;
