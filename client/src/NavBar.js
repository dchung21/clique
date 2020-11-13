import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


export default function SiteNavBar(props) {
	return (
		<Navbar bg="dark" variant="dark">
			<Nav className="mr-auto">
      			<Nav.Link href="/home">Home</Nav.Link>
      			<Nav.Link href="/convos">Chat</Nav.Link>
      			<Nav.Link href="/profile">Profile</Nav.Link>
				<Nav.Link href="/match">Match</Nav.Link>
    		</Nav>	
		</Navbar>
	)
}
