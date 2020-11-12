import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import HomeIcon from '@material-ui/icons/Home'; 
import ChatIcon from '@material-ui/icons/Chat'; 
import "../Button.css"

export default function Match() {
	return (
        
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div>
                <Link to='/home'>
                    <Button variant = "primary">
                        home
                    </Button>
                </Link>
                <h1> Match Page</h1>
                <Link to='/chat'>
                    <Button variant = "primary">
                        chat
                    </Button>
                </Link>

                <Button variant = "outline-secondary">next</Button>
            </div>
        </Container>
    )

    
    
}
