import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Media from 'react-bootstrap/Media'
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default function Convos() {
    const [convos, setConvos] = useState([]);
    const [uid, setUid] = useState("");
    const [loading, setLoading] = useState(true);

    //reference to storage service
    let storage = firebase.storage();
    let fs = firebase.firestore();
    const ref = React.useRef();

    async function getConvos(user, uidTarget) {
        // get convos from uidTarget
        fs.collection("conversations").where(uidTarget, "==", user.uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let otherUid = (uidTarget == "uid1") ? doc.data().uid2 : doc.data().uid1;
                //get the images for the convos of the other person
                storage.ref("pix").child(otherUid).getDownloadURL().then(url => {
                    
                    //get the last message
                    fs.collection("conversations/" + doc.id + "/messages").orderBy("timestamp", "desc").limit(1)
                    .get()
                    .then(function(messageSnapshot) {
                        let count = 0;
                        messageSnapshot.forEach(function(messageDoc) {
                            // set the convo with info about url and last message data
                            setConvos([...convos, {
                                imgURL: url,
                                content: messageDoc.data().content,
                                timestamp: messageDoc.data().timestamp,
                                convoRef: "conversations/" + doc.id + "/messages"
                            }]);
                            count++;
                            console.log(count);
                        });
                        if(count > 1) {
                            console.log("something went wrong, more than one message.");
                        } else if(count == 1) {
                            console.log("successful got one message.");
                        } else {
                            console.log("something wierd happened");
                        }
                    });
                })
            })
        })

    }

    useEffect(() => {
		//I think there should be a better way to verify that the user is always logged in to render component
		//we need to redirect/do something different if user is not logged in.
		 async function fetchData() {
			 firebase.auth().onAuthStateChanged(function(user) {
				if (user != null) {
                    setUid(user.uid);
                    getConvos(user, "uid1");
                    getConvos(user, "uid2");
                    setLoading(false);
				}
				else
					console.log("not logged in");
			});
		}
        
        fetchData();

    }, []);

    let listItems;
    if(loading) {
        listItems = <h3>...</h3>
    } else if(!loading && convos.length == 0) {
        listItems = <h3>You have no conversations :(</h3>
    } else {
        console.log(convos);
        listItems = <ListGroup>
            {
                convos.map((convo) => (
                    <ListGroup.Item key={convo.timestamp}>
                        <Media as="li">
                            <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src={convo.imgURL}
                            alt="Img"
                            />
                            <Media.Body>
                                <Link to={{
                                    pathname: '/chat',
                                    state: { convoRef: convo.convoRef }
                                }}>
                                    <h5>Convo 1</h5>
                                </Link>
                                <p>
                                    {convo.content}
                                </p>
                            </Media.Body>
                        </Media>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    }

	return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="w-75">
                <Link to='/home'>Home</Link>
                <h2>Convos</h2>
                {listItems}
            </Container>
        </Container>
	)
	
}