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
    const [loaded, setLoaded] = useState(0);

    //reference to storage service
    let storage = firebase.storage();
    let fs = firebase.firestore();
    const ref = React.useRef();

    let convoBuffer = [];

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
                            // pushes into convo buffer
                            convoBuffer.push({
                                imgURL: url,
                                content: messageDoc.data().content,
                                timestamp: messageDoc.data().timestamp,
                                convoRef: "conversations/" + doc.id + "/messages"
                            })
                            // setting the convos after convoBuffer??
                            setConvos(convoBuffer);
                            count++;
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
            setLoaded(loaded+1);
            console.log("loaded: ",loaded);
        })
    }

    useEffect(() => {
		 async function fetchData() {
			await firebase.auth().onAuthStateChanged(async function(user) {
				if (user != null) {
                    setUid(user.uid);
                    // I think it may be a concurrency issue??
                    await getConvos(user, "uid1")
                    await getConvos(user, "uid2")
                    // right here idk
                    //setConvos(convoBuffer)
                    console.log("convoBuffer in fetchData: ", convoBuffer);
				}
				else
					console.log("not logged in");
			});
		}
        
        fetchData();

    }, []);

    let listItems;
    if(loaded < 1) {
        listItems = <h3>...</h3>
    } else if(loaded >= 1 && convos.length == 0) {
        listItems = <h3>You have no conversations :(</h3>
    } else {
        console.log("listGroup convos:", convos);
        listItems = <ListGroup>
            {
                convos.map((convo, key) => (
                    <ConvoItem key={"CI" + key.toString} imgURL={convo.imgURL} convoRef={convo.convoRef} content={convo.content} count={(key+1).toString()}/>
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

function ConvoItem(props) {
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