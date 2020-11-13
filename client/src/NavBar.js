import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


export default function SiteNavBar(props) {
	return (
		<Navbar sticky="top" bg="dark" variant="dark">
			<Navbar.Brand>Clique</Navbar.Brand>
			<Nav className="mr-auto">
      			<Nav.Link href="/convos">Chat</Nav.Link>
      			<Nav.Link href="/profile">Profile</Nav.Link>
				<Nav.Link href="/match">Match</Nav.Link>
    		</Nav>	
			<Nav className="ml-auto">
				<Nav.Link href="/login">Logout</Nav.Link>
			</Nav>
		</Navbar>
	)
}
