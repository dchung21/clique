import React from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import ConvoItem from './ConvoBox.js';

export default function ConvoContainer(props) {
	const convos = props.convos;
	const loaded = props.loaded;
	let content;
	console.log("container", convos)
	if (loaded < 1)
		content = <>
			<Spinner animation="border" variant="primary" />
		</>
	else if (loaded >= 1 && convos.length === 0)
		content = <h3>You have no conversations :(</h3>
	else {
		content = (
			<ListGroup>
				{console.log("rendering", convos.length, convos)}
				{convos.map((convo, key) => (
					<ConvoItem key = {"CI" + key.toString()} imgURL = {convo.imgURL} convoRef = {convo.convoRef} content = {convo.content} count={(key+1).toString()}/>	
				))}
			</ListGroup>
		);
	}

	return ( content );
}
        
