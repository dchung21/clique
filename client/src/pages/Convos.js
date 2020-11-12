import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import ConvoItem from './ConvoBox.js';
import ConvoContainer from './ConvoContainer.js';
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
        
        fetchData().then(() => { console.log(convoBuffer)});

    }, []);



    console.log("listGroup convos:", convos);
	return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="w-75">
                <Link to='/home'>Home</Link>
                <h2>Convos</h2>
				<ConvoContainer loaded = {loaded} convos = {convos} />
            </Container>
        </Container>
	)
	
}


