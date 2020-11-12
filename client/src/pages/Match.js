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

	let fs = firebase.firestore();
	let storage = firebase.storage();
	useEffect(() => {
		randUser();	
	}, []);

	const randUser = () => {
		fs.collection("users").get().then(function(snapshot) {
			let len = snapshot.docs.length;
			let i = Math.floor(Math.random()*len);
			const randUser = snapshot.docs[i].data();
			storage.ref("pix").child(randUser.uid).getDownloadURL().then(url => {
				const userObj = {uid: randUser.uid, img: url, bio: randUser.bio};
				setUser(userObj);
			});
		});
	}

	return (
		<div>
			<header>
				<Card className = "text-center">
					<Card.Img className="d-flex m-auto mx-auto" 
						src = {currentUser.img} responsive style = {{ width: "750px", weight: "750px" }} />
					<Card.Body>
						
						<Card.Text className="d-flex justify-content-center align-items-center">
							{currentUser.bio}
						</Card.Text>

						<ButtonToolbar className="d-flex justify-content-center align-items-center">

							<Link to='/chat'>
								<Button variant="primary" size="lg" ><ChatIcon /></Button>
							</Link>

							<br></br>

							<Link to='/home'>
                				<Button variant = "primary" size="lg"><HomeIcon /></Button>
							</Link>

							<br></br>

							<Link to='/match'>
								<Button variant="primary" size="lg"><SkipNextIcon /></Button>
							</Link>

						</ButtonToolbar>
					</Card.Body>
				</Card>
			</header>
		</div>
	)
}
