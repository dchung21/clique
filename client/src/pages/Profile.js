import React, { useState } from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { FIREBASE_CONFIG } from '../config.js';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

export default function Profile(props) {
	const [image, setImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [bio, setBio] = useState("");
	const [uid, setUid] = useState("");



	//reference to storage service
	let storage = firebase.storage();

	//on selection of image from the user
	const handleImageChange = (event) => {
		if (event.target.files[0]) {
			const image = event.target.files[0];
			setImage(image);	
		}
	}

	//on typing of words into textarea
	const handleTextChange = (event) => {
		setBio(event.target.value);
	}

	//TODO 
	//this will upload image to firebase storage, I want to hash it with userID
	const handleImageUpload = (event) => {
		//prevent from reloading page on submission
		event.preventDefault();

		console.log("Starting upload");
		const upload = storage.ref(`pix/${uid}`).put(image);
		upload.on("state_changed",
			(snapShot) => {
				console.log(snapShot);
			}, (err) => {
				console.log(err);
			}, () => {
				storage.ref("pix").child(`${uid}`).getDownloadURL()
				.then(url => {
					setImageUrl({url});
					setImage("");
					event.target.value = null;
					console.log("done uploading");
				})
			})
	}

	//TODO plus delete previous messages
	//this will upload bio to cloud firestore
	const handleBioUpload = (event) => {

		//only length of 10 or less
		if(bio.split(" ").length > 10) {
			alert("Your description is too long!");
		} else {
			alert("You just updated your description with: " + bio);
			const db = firebase.firestore();
			db.settings({
				timestampsInSnapshots: true
			});
			const userRef = db.collection("users").add({
				uid: uid,
				bio: bio
			});
		}

		//prevent from reloading page on submission
		event.preventDefault();

	}

	//I think there should be a better way to verify that the user is always logged in to render component
	//we need to redirect/do something different if user is not logged in.
	firebase.auth().onAuthStateChanged(function(user) {
		if (user != null) {
			console.log(user.uid);
			setUid(user.uid);
		}
		else
			console.log("x");
	});


	
	return (
		<Container className="d-flex justify-content-center align-items-center min-vh-100">
			<div className="w-75">
				<Link to='/home'>Home</Link>
				<h3>Welcome user: {uid}</h3>
				<Form onSubmit={handleImageUpload}>
					<Form.Group controlId="formImage">
						<Form.Label>Upload an image (not of yourself)</Form.Label>
						<Form.File onChange = {handleImageChange} />
						<Button variant="primary" type="submit">
							Upload
						</Button>
					</Form.Group>
				</Form>
				<Form onSubmit={handleBioUpload}>
					<Form.Group controlId="formTextarea">
						<Form.Label>Write something that describes you (10 words max)</Form.Label>
						<Form.Control as="textarea" placeholder="Your 10 words!" rows={3} value={bio} onChange={handleTextChange} />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</Container>
	)
	
}