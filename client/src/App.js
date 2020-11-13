import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext.js";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute.js";

import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";

import Home from "./pages/Home.js";
import Match from "./pages/Match.js";
import Convos from "./pages/Convos.js";
import Chat from "./pages/Chat.js";
import Profile from "./pages/Profile.js";
import WebNavBar from './NavBar.js';
import firebase from 'firebase/app'
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const auth = firebase.auth();

  const [user] = useAuthState(auth)

  return (
	  <Container style = {{minHeight: "100vh", minWidth: "100vw", margin: 0, padding: 0, border: 0}} > 
		<WebNavBar />
      <div className = "d-flex align-items-center justify-content-center"
      style = {{ minHeight: "80vh" }}
      >

        <Router>
          <AuthProvider>
            <Switch>

              <Route path = "/signup" component = {Signup} />
              <Route path = "/login" component = {Login} />
                
              <PrivateRoute path = "/home" component = {Home} />
              <PrivateRoute path = "/match" component = {Match} />
              <PrivateRoute path = "/convos" component = {Convos} />
              <PrivateRoute path = "/chat" component = {Chat}/>
              <PrivateRoute path = "/profile" component = {Profile} />

              <Route path="/">
                {user ? <Redirect to="/profile"/> : <Redirect to="/login"/>}
              </Route>

            </Switch>
          </AuthProvider>
        </Router>
    </div>
	</Container>
  )
}

export default App;
