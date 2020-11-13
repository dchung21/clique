import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
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

    useEffect(() => {
         function resolveMe(docId, uid) {
            return new Promise(resolve => {
                fs.collection("conversations/" + docId + "/messages").orderBy("timestamp", "desc").limit(1).get().then(function(messageSnapshot) {
                             messageSnapshot.forEach(function(messageDoc) {
                                 messageSnapshot.forEach(function(messageDoc) {
                                     storage.ref("pix").child(uid).getDownloadURL().then(url => {
                                         let obj = {
                                            imgURL: url,
                                            content: messageDoc.data().content,
                                            timestamp: messageDoc.data().timestamp,
                                            convoRef: "conversations/" + docId + "/messages"
                                         }
                                         resolve(obj);
                                     })
                                 })
                             })
                    })
            });
         }

         async function childMsgFetch(uids, docId) {
                 let convoBuffer = [];
                 for (let i in docId) {
                     let conversation = await resolveMe(docId[i], uids[i]);
                     convoBuffer.push(conversation);
                 }
                 let count = convoBuffer.length;
                 if(count > 1) {
                            console.log("something went wrong, more than one message.");
                 } else if(count === 1) {
                            console.log("successful got one message.");
                } else {
                            console.log("something wierd happened");
                 }
                 setLoaded(loaded+1);
                 setConvos(convoBuffer);
        }
        
		 async function fetchData() {
            const result = await firebase.auth().onAuthStateChanged(function(user) {
                if (user != null) {
                    fs.collection("conversations").where("uid1", "==", user.uid).get().then(function(snapshot1) {
                        fs.collection("conversations").where("uid2", "==", user.uid).get().then(function(snapshot2) {
                            let uids = [];
                            let docId = [];
                            snapshot1.forEach(function(doc) {
                                 uids.push(doc.data().uid2);
                                 docId.push(doc.id);
                            })
                            snapshot2.forEach(function(doc) {
                                uids.push(doc.data().uid1);
                                docId.push(doc.id);
                            })
                            childMsgFetch(uids, docId);
                        })
                    })
                }
            })

		}
        
        fetchData();

    }, []);



    console.log("listGroup convos:", convos);
	return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Container className="w-75">
                <h2>Convos</h2>
				<ConvoContainer loaded = {loaded} convos = {convos} />
            </Container>
        </Container>
	)
	
}


