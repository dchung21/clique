import './App.css';
import LoginPage from './Login.js';
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
            <Route path="/signedIn">
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



export default App;
