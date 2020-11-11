import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import HomeIcon from '@material-ui/icons/Home'; 
import ChatIcon from '@material-ui/icons/Chat'; 
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';
import "../Button.css"

export default function Match() {
	return (
        
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className = "button">
                <Link to='/home'>
                    <Button variant = "primary">
                        home
                    </Button>
                </Link>
            </div>
            <h1> Match Page</h1>
            <div className = "button">
                <Link to='/chat'>
                    <Button variant = "primary">
                        chat
                    </Button>
                </Link>

                <Button variant = "outline-secondary">next</Button>
            </div>
        </Container>
    )

    //<h2>Matching Page</h2>
    
    
}

//<div>
            //<h1>spain without the s</h1>
            /* <ChatIcon />
            <div>
                <Link to='/home'>
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                </Link>
            <Link to='/chat'>
                <IconButton>
                    <ChatIcon />
                </IconButton>
            </Link>

            <NavigateNextIcon/>
            </div> */

        //</div>