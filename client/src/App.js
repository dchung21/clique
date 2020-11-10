import './App.css';
import LoginPage from './Login.js';
import Home from './Home.js';
import Profile from './Profile.js';
import Convos from './Convos.js';
import Match from './Match.js'
import Chat from './Chat.js'

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
        </header>
      </div>
    </Router>
  );
}



export default App;
