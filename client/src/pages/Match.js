import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {Card, Container, Button, ButtonToolbar} from 'react-bootstrap'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ClearIcon from '@material-ui/icons/Clear';
import firebase from 'firebase/app'; 
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import 'firebase/firestore';
import "../Button.css"

export default function Match() {
	const [currentUser, setUser] = useState({uid: "", img: "", bio: ""});
	const [matchedUsers, setMatchedUsers] = useState({});
	const [uid, setUid] = useState("");
	const [nop, setNop] = useState(false);
	const [newConvoRef, setNewConvoRef] = useState("");
	const [loaded, setLoaded] = useState(false);

	let fs = firebase.firestore();
	let storage = firebase.storage();
	useEffect(() => {
		async function fetchData() {
			let prevMatch = new Set();	
			const result = await firebase.auth().onAuthStateChanged(function(user) {
				if (user != null) {
					fs.collection("users").doc(user.uid).collection("matchedUsers").get().then(function(snapshot) {
					for (let doc in snapshot.docs) {
						prevMatch.add(snapshot.docs[doc].data().uid);
					}	
					}).then(() => {
						setUid(user.uid);
						setMatchedUsers(prevMatch);
						randUser(user.uid, prevMatch);
					});
				}
			});
		}

		fetchData();
	}, []);

	function makeid(length) {
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	 }

	const randUser = (userUid, set) => {
		setLoaded(false);
		fs.collection("users").get().then(function(snapshot) {
			let len = snapshot.docs.length;
			if (set.size < len) {
				let i = Math.floor(Math.random()*len);
				let randUser = snapshot.docs[i].data();
				while (set.has(randUser.uid)) {
					i = Math.floor(Math.random()*len);	
					randUser = snapshot.docs[i].data();
				}

				const randId = makeid(16);
				
				setNewConvoRef("conversations/" + randId + "/messages");
				storage.ref("pix").child(randUser.uid).getDownloadURL().then(url => {
					let randBio = "They haven't put a bio yet :("
					if (randUser.bio != "")
						randBio = randUser.bio;	

					const userObj = {uid: randUser.uid, img: url, bio: randBio};
					setUser(userObj);
				});
				let clonedMU = new Set(set);
				clonedMU.add(randUser.uid);
				setMatchedUsers(clonedMU);
				setLoaded(true);
				fs.collection("users").doc(userUid).collection("matchedUsers").doc(randUser.uid).set({uid: randUser.uid});	
				fs.collection("users").doc(randUser.uid).collection("matchedUsers").doc(userUid).set({uid:randUser.uid});
			}

			else {
				setLoaded(true);
				setNop(true);
			}
		});
	}

	const makeConvo = () => {
		// make a new conversation
		const path = newConvoRef.split("/")
		fs.collection(path[0]).doc(path[1]).set({
			uid1: uid,
			uid2: currentUser.uid
		}).then(function() {
			// make a new collection of messages in the conversation
			console.log("Success making new conversation document!");
			fs.collection(newConvoRef).add({
				content: "This is the start of our new connection...",
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				uid
			}).then(function() {
				console.log("Success making new message in the conversation!");
			}).catch(function(error) {
				console.log("Error making new message in conversation: ", error);
			})
		}).catch(function(error) {
			console.log("error making new conversation document", error);
		})
	}

		const availMatches = (
			<div>
			<Card.Img className="d-flex m-auto mx-auto" 
				src = {currentUser.img} responsive style = {{ maxWidth: "60vw", maxHeight: "60vh" }} rounded/>
				<Card.Body>
						
				<Card.Text className="d-flex justify-content-center align-items-center">
					{currentUser.bio}
				</Card.Text>

				<ButtonToolbar className="d-flex justify-content-center align-items-center">

				<Link to={{
        			pathname: '/chat',
                    state: { convoRef: newConvoRef }
                }}>
					<Button className = "mx-5" variant="primary" size="lg"><ChatBubbleIcon onClick = {makeConvo}/></Button>
				</Link>


				<Link to='/match'>
					<Button className = "mx-5" variant="primary" size="lg"><ClearIcon onClick= {() => randUser(uid, matchedUsers)}/></Button>
				</Link>
				</ButtonToolbar>

				</Card.Body>
			</div>
		);

		const noMatches = (
			<div>
				<Card.Body>
					<Card.Text className="d-flex justify-content-center align-items-center" >
						<div>
							<h2>You've matched with every single person!</h2>
							<p>Go chat someone up! :)</p>
							<Link to='/convos'>
								<Button className = "btn btn-info" variant = "primary" size="lg">
									<ChatBubbleIcon />
								</Button>	
							</Link>
						</div>
					</Card.Text>


				</Card.Body>
			</div>
		);

		let renderedComponent;
		if (!loaded) {
			renderedComponent = <> <Spinner animation = "border" variant="primary" /> </>
		}

		else {
			if (nop) {
				renderedComponent = noMatches;
			}
			else {
				renderedComponent = availMatches;
			}
		}


	return (
		<div>
			<header>
				<Card border="light" className = "text-center">
					{renderedComponent}		
				</Card>
			</header>
		</div>
	)
}
