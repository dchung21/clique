import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import HomeIcon from '@material-ui/icons/Home'; 
import ChatIcon from '@material-ui/icons/Chat'; 
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
				<div className = "userProfile">
					<Image className="w-50 h=50" src={currentUser.img} />
					<h3>{currentUser.bio}</h3>
				</div>
                <Link to='/chat'>
                    <Button variant = "primary">
                        chat
                    </Button>
                </Link>

                <Button variant = "outline-secondary" onClick={() => randUser(uid, matchedUsers)}>swipe left</Button>
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
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div>
                <Link to='/home'>
                    <Button variant = "primary">
                        home
                    </Button>
                </Link>
                <h1> Match Page</h1>
				{renderedComponent}
			</div>
        </Container>
    )

    
    
}
