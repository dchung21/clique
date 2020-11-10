import logo from './logo.svg';
import './App.css';
import LoginPage from './Login.js';
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
              <SignedInPage />
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

function SignedInPage() {
	return <h2>You successfully signed in</h2>;
}

export default App;
