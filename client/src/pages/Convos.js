import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Media from 'react-bootstrap/Media'
import { Link } from "react-router-dom";

export default function Convos() {

	return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="w-75">
                <Link to='/home'>Home</Link>
                <h2>Convos</h2>
                <ListGroup>
                    <ListGroup.Item>
                        <Media as="li">
                            <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src="holder.js/64x64"
                            alt="Img"
                            />
                            <Media.Body>
                                <Link to='/chat'>
                                    <h5>Convo 1</h5>
                                </Link>
                                <p>
                                    The conversation that was happening in Convo 1 with somebody somewhere saying something...
                                </p>
                            </Media.Body>
                        </Media>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Media as="li">
                            <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src="holder.js/64x64"
                            alt="Img"
                            />
                            <Media.Body>
                                <Link to='/chat'>
                                    <h5>Convo 2</h5>
                                </Link>
                                <p>
                                    The conversation that was happening in Convo 2 with somebody somewhere saying something...
                                </p>
                            </Media.Body>
                        </Media>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </Container>
	)
	
}