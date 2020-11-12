import React, { useState } from 'react';
import { Button, Container, Jumbotron } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";


export default function Home() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError("");

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
            </div>
        </>
    )	
}
