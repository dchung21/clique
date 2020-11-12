import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {Card, Container, Button, ButtonToolbar} from 'react-bootstrap'
import HomeIcon from '@material-ui/icons/Home'; 
import ChatIcon from '@material-ui/icons/Chat';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import firebase from 'firebase/app'; 
import Image from 'react-bootstrap/Image';
import 'firebase/firestore';
import "../Button.css"

export default function Match() {
	const [currentUser, setUser] = useState({uid: "", img: "", bio: ""});
	const [matchedUsers, setMatchedUsers] = useState({});
	const [uid, setUid] = useState("");
	const [nop, setNop] = useState(false);

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

	const randUser = (userUid, set) => {
		fs.collection("users").get().then(function(snapshot) {
			let len = snapshot.docs.length;
			if (set.size < len) {
				let i = Math.floor(Math.random()*len);
				let randUser = snapshot.docs[i].data();
				while (set.has(randUser.uid)) {
					i = Math.floor(Math.random()*len);	
					randUser = snapshot.docs[i].data();
				}

				storage.ref("pix").child(randUser.uid).getDownloadURL().then(url => {
					const userObj = {uid: randUser.uid, img: url, bio: randUser.bio};
					setUser(userObj);
				});
				let clonedMU = new Set(set);
				clonedMU.add(randUser.uid);
				setMatchedUsers(clonedMU);
				fs.collection("users").doc(userUid).collection("matchedUsers").doc(randUser.uid).set({uid: randUser.uid});	
			}

			else {
				setNop(true);
			}
		});
	}

		const availMatches = (
			<div>
			<Card.Img className="d-flex m-auto mx-auto" 
				src = {currentUser.img} responsive style = {{ width: "750px", weight: "750px" }} />
				<Card.Body>
						
				<Card.Text className="d-flex justify-content-center align-items-center">
					{currentUser.bio}
				</Card.Text>

				<ButtonToolbar className="d-flex justify-content-center align-items-center">

				<Link to='/chat'>
					<Button className = "mx-5" variant="primary" size="lg"><ChatIcon /></Button>
				</Link>

				<Link to='/home'>
                	<Button className = "mx-5" variant = "primary" size="lg"><HomeIcon /></Button>
				</Link>

				<Link to='/match'>
					<Button className = "mx-5" variant="primary" size="lg"><SkipNextIcon onClick= {() => randUser(uid, matchedUsers)}/></Button>
				</Link>
				</ButtonToolbar>

				</Card.Body>
			</div>
		);

		const noMatches = (
			<h2>You've matched with every single person!</h2>
		);

		let renderedComponent;
		if (nop) {
			renderedComponent = noMatches;
		}
		else {
			renderedComponent = availMatches;
		}


	return (
		<div>
			<header>
				<Card className = "text-center">
					{renderedComponent}		
				</Card>
			</header>
		</div>
	)
}
