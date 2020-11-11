import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import HomeIcon from '@material-ui/icons/Home'; 
import ChatIcon from '@material-ui/icons/Chat';

export default function Match() {
    function Header() {
         
    }

	return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div>
                <Link to='/home'>
                    <Button variant = "primary">
                        <HomeIcon />
                    </Button>
                </Link>

                <h2>Matching Page</h2>

                <Link to='/chat'>
                    <Button variant = "primary">
                        <ChatIcon />
                    </Button>
                </Link>

                <Button variant = "outline-secondary">next</Button>{' '}
            </div>
        </Container>
	)
    
    
}