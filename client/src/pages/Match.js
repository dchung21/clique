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
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div>
                <Link to='/home'>
                    <Button variant = "primary">
                        home
                    </Button>
                </Link>
                <h1> Match Page</h1>
				<div className = "userProfile">
					<Image className="w-50 h=50" src={currentUser.img} />
					<h3>{currentUser.bio}</h3>
				</div>
                <Link to='/chat'>
                    <Button variant = "primary">
                        chat
                    </Button>
                </Link>

                <Button variant = "outline-secondary" onClick={randUser}>swipe left</Button>
            </div>
        </Container>
    )

    
    
}
