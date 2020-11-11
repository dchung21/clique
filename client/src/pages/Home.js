import React from 'react';
import { Link } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

export default function Home() {

	return (
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
        </div>
	)
	
}