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
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="w-75">
                <Link to='/home'>Home</Link>
                <h2>Chat</h2>
                <Card>
                    <Card.Body>
                        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} yourImgUrl={yourImg.url} theirImgUrl={theirImg.url} currentUser={uid}/>)}
                        <div ref={dummy}></div>
                    </Card.Body>
                    <form onSubmit={sendMessage}>
                        <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                        <button type="submit">Send</button>
                    </form>
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
            <Media>
                <Media.Body className="align-middle">
                    <Alert variant="primary" className="text-right w-50 float-right">{content}</Alert>
                </Media.Body>
                <Image
                width={imageSize}
                height={imageSize}
                className="align-self-center ml-3"
                src={photoURL}
                roundedCircle
                />
            </Media>
        );
    } else {
        htmlContent = (
            <Media>
                <Image
                width={imageSize}
                height={imageSize}
                className="align-self-center mr-3"
                src={photoURL}
                roundedCircle
                />
                <Media.Body className="align-middle">
                    <Alert variant="dark" className="text-left w-50 float-left">{content}</Alert>
                </Media.Body>
            </Media>
        );

    }

    return (htmlContent);
}

{/* <div className={`message ${messageClass}`}>
<img
width={64}
height={64}
src={photoURL}
alt="Img"
/>
<p>{content}</p>    
</div> */}