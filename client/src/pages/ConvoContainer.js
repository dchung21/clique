import React from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import ConvoItem from './ConvoBox.js';

export default function ConvoContainer(props) {
	const convos = props.convos;
	const loaded = props.loaded;
	let content;
	if (loaded < 1)
		content = <h3>...</h3>
	else if (loaded >= 1 && convos.length == 0)
		content = <h3>You have no conversations :(</h3>
	else {
		content = (
			<ListGroup>
				{convos.map((convo, key) => (
					<ConvoItem key = {"CI" + key.toString()} imgURL = {convo.imgURL} convoRef = {convo.convoRef} content = {convo.content} count={(key+1).toString()}/>	
				))}
			</ListGroup>
		);
	}

	return (
	<Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="w-75">
                <Link to='/home'>Home</Link>
                <h2>Convos</h2>
				{content}
            </Container>
        </Container>
	);
}
        
