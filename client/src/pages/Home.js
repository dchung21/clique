<<<<<<< Updated upstream
import React from 'react';
import { Link } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import firebase from 'firebase/app';
=======
import React, { useState } from 'react';
import { Button, Card, Container, Jumbotron, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

>>>>>>> Stashed changes

export default function Home() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError("");

<<<<<<< Updated upstream
    const logOut = (event) => {
		firebase.auth().signOut().then(function() {
            console.log("signed out");
          }).catch(function(error) {
            console.log("error signing out")
          });
	};

	return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100" fluid>
            <div>
                <Jumbotron>
                    <h1>Match</h1>
                    <p>
                        Find someone who shares your interests! Make new friends with the click
                        of a button!
                    </p>
                    <p>
                        <Link to='/match'>
                            <Button variant="primary">Start Now</Button>
                        </Link>
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <h1>Conversations</h1>
                    <p>
                        Chat with someone you've already connected with!
                    </p>
                    <p>
                        <Link to='/convos'>
                            <Button variant="primary">Chat</Button>
                        </Link>
                    </p>
                </Jumbotron>
                <Jumbotron>
                    <h1>Profile</h1>
                    <p>
                        Take a look at your own profile! Change it to your liking!
                    </p>
                    <p>
                        <Link to='/profile'>
                            <Button variant="primary">Profile</Button>
                        </Link>
                    </p>
                </Jumbotron>

                <Jumbotron>
                    <h1>Log Out</h1>
                    <p>
                        Log Out!
                    </p>
                    <p>
                        <Link to='/login'>
                            <Button variant="primary" onClick={logOut}>Log Out</Button>
                        </Link>
                    </p>
                </Jumbotron>
=======
        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to log out!");
        }
    }

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center min-vh-100" fluid>
                <div>
                    <Jumbotron>
                        <h1>Match</h1>
                        <p>
                            Find someone who shares your interests! Make new friends with the click
                            of a button!
                        </p>
                        <p>
                            <Link to='/match'>
                                <Button variant="primary">Start Now</Button>
                            </Link>
                        </p>
                    </Jumbotron>
                    <Jumbotron>
                        <h1>Conversations</h1>
                        <p>
                            Chat with someone you've already connected with!
                        </p>
                        <p>
                            <Link to='/convos'>
                                <Button variant="primary">Chat</Button>
                            </Link>
                        </p>
                    </Jumbotron>
                    <Jumbotron>
                        <h1>Profile</h1>
                        <p>
                            Take a look at your own profile! Change it to your liking!
                        </p>
                        <p>
                            <Link to='/profile'>
                                <Button variant ="primary">Profile</Button>
                            </Link>
                        </p>
                    </Jumbotron>
                </div>
            </Container>

            <div className = "w-100 text-center mt-2">
                <Button variant  = "link" onClick = {handleLogout}>Log Out</Button>
>>>>>>> Stashed changes
            </div>
        </>
    )	
}

//<div className = "w-100 text-center mt-2">
//Need an account? <Link to ="signup">Sign Up</Link>
//</div>
