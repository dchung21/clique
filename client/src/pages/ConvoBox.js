import React from 'react';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Media from 'react-bootstrap/Media'
import { Link } from "react-router-dom";


export default function ConvoItem(props) {
	return (
		<ListGroup.Item key={props.key}>
            <Media as="li">
                <img
                width={64}
                height={64}
                className="mr-3"
                src={props.imgURL}
                alt="Img"
                />
                <Media.Body>
                    <Link to={{
                        pathname: '/chat',
                        state: { convoRef: props.convoRef }
                    }}>
                        <h5>Convo {props.count}</h5>
                    </Link>
                    <p>
                        {props.content}
                    </p>
                </Media.Body>
            </Media>
        </ListGroup.Item>

	)
}
