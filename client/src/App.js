import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import LoginPage from './pages/Login.js';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import Convos from './pages/Convos.js';
import Match from './pages/Match.js'
import Chat from './pages/Chat.js'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <Container>
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
        </Container>
      </div>
    </Router>
  );
}



export default App;
