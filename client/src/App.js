import './App.css';
import LoginPage from './Login.js';
import Home from './Home.js'
import Profile from './Profile.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
              <Matching />
            </Route>
            <Route path='/convos'>
              <Convos />
            </Route>
            <Route path='/profile'>
              <Profile />
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


const Matching = () => <h2>Matching Page</h2>

const Convos = () => <h2>Convos Page</h2>



export default App;
