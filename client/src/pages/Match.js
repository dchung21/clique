import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

export default function Match() {

	return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div>
                <Button variant = "primary">
                    <Link to='/home'>Home</Link>
                </Button>{' '}
                <h2>Matching Page</h2>
                <Button variant = "primary">
                    <Link to='/chat'>Chat</Link>
                </Button>{' '}
                <Button variant = "outline-secondary">next</Button>
            </div>
        </Container>
	)
    
    
}