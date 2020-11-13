import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';

import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import Image from 'react-bootstrap/Image';
import { ListGroup } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


export default function Chat(props) {
    const [yourImg, setYourImg] = useState("");
    const [theirImg, setTheirImg] = useState("");
    const [uid, setUid] = useState("");

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    const dummy = useRef();

    const messagesRef = firestore.collection(props.location.state.convoRef);
    const query = messagesRef.orderBy('timestamp').limit(50);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState("");

    const storage = firebase.storage();

    useEffect(() => {
        // gets both of your pictures
		async function fetchData() {
			firebase.auth().onAuthStateChanged(function(user) {
				if (user != null) {
					setUid(user.uid);
					storage.ref("pix").child(user.uid).getDownloadURL().then(url => {
						setYourImg({url});	
					}).catch(error => {
						console.log("Error: " + error);
                    });
                    
                    let path = props.location.state.convoRef.split("/");

                    firestore.collection(path[0]).doc(path[1])
                    .get()
                    .then(function(doc) {
                        if(doc.exists) {
                            const theirUID = (doc.data().uid1 !== user.uid) ? doc.data().uid1 : doc.data().uid2;
                            storage.ref("pix").child(theirUID).getDownloadURL().then(url => {
                                setTheirImg({url});
                            }).catch(error => {
                                console.log("Error: " + error);
                            })
                        } else {
                            console.log("Convo doesn't exist???")
                        }
                    }).catch(error => {
                        console.log("Error: " + error);
                    })
			
				}
				else
					console.log("not logged in");
			});
		}
	
		fetchData();
    }, []);
    
    const sendMessage = async(e) => {

        // stop refresh
        e.preventDefault();

        // add the message
        await messagesRef.add({
            content: formValue,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        });


        setFormValue("");

        dummy.current.scrollIntoView({ behavior: 'smooth'});
    }

	return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Container className="h-100 w-50">
                <h2 className="text-center m-3">Chat</h2>
                <Card className="border-light h-75">
                    <Card.Body className="overflow-auto">
                        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} yourImgUrl={yourImg.url} theirImgUrl={theirImg.url} currentUser={uid}/>)}
                        <div ref={dummy}></div>
                    </Card.Body>
                    <Form onSubmit={sendMessage} fluid>
                        <Form.Row className="d-flex justify-content-end w-100 ml-0">
                            <Col xs={10} className="p-0">
                                <Form.Control type="message" placeholder="Your message" value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                            </Col>
                            <Col className="p-0">
                                <Button variant="info" type="submit" className="w-100">Send</Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Card>
            </Container>
        </Container>
	)
	
}

function ChatMessage(props) {
    const { content, uid } = props.message;

    const messageClass = (uid === props.currentUser) ? 'sent' : 'recieved';
    const photoURL = (uid === props.currentUser) ? props.yourImgUrl : props.theirImgUrl;

    const imageSize = 32;

    let htmlContent;
    if(messageClass == 'sent') {
        htmlContent = (
            <Media className="w-100">
                <Media.Body className="align-middle w-75">
                    <Alert variant="primary" className="text-right w-50 float-right">{content}</Alert>
                </Media.Body>
                <Image
                width={imageSize}
                height={imageSize}
                className="align-self-end ml-3"
                src={photoURL}
                roundedCircle
                />
            </Media>
        );
    } else {
        htmlContent = (
            <Media className="w-100">
                <Image
                width={imageSize}
                height={imageSize}
                className="align-self-end mr-3"
                src={photoURL}
                roundedCircle
                />
                <Media.Body className="align-middle w-75">
                    <Alert variant="dark" className="text-left w-50 float-left">{content}</Alert>
                </Media.Body>
            </Media>
        );

    }

    return (htmlContent);
}