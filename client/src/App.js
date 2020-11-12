import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute.js";

import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";

import Home from "./pages/Home.js";
import Match from "./pages/Match.js";
import Convos from "./pages/Convos.js";
import Chat from "./pages/Chat.js";
import Profile from "./pages/Profile.js";

import "firebase/firestore";
import "firebase/auth";

function App() {
  return (
    
      <Container className = "d-flex align-items-center justify-content-center"
      style = {{ minHeight: "100vh" }}
      >

        <div className = "w-100" style = {{ maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Switch>
                
                <Route path = "/signup" component = {Signup} />
                <Route path = "/login" component = {Login} />
                
                <PrivateRoute path = "/home" component = {Home} />
                <PrivateRoute path = "/match" component = {Match} />
                <PrivateRoute path = "/convos" component = {Convos} />
                <PrivateRoute path = "/chat" component = {Chat} />
                <PrivateRoute path = "/profile" component = {Profile} />

              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  )
}

export default App;
