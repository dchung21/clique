import React, { useState } from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { FIREBASE_CONFIG } from '../config.js';

export default function Profile(props) {
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");

	//this is probably hacky code and will be prone to crashing
	const auth = firebase.auth();
	/////////	

	//reference to storage service
	let storage = firebase.storage();

	//on selection of image from the user
	const onChange = (event) => {
		if (event.target.files[0]) {
			const image = event.target.files[0];
			setImage(image);	
		}
	}

	//on typing of words into textarea
	const handleTextChange = (event) => {
		setDescription(event.target.value);
	}

	//TODO 
	//this will upload image to firebase storage, I want to hash it with userID
	const handleUpload = (event) => {
		//prevent from reloading page on submission
		event.preventDefault();

		console.log("Starting upload");
		const upload = storage.ref(`pix/test`).put(image);
	}

	//TODO
	//this will upload text to firebase cloud
	const handleTextUpload = (event) => {

		//only length of 10 or less
		if(description.split(" ").length > 10) {
			alert("Your description is too long!");
		} else {
			alert("You just updated your description with: " + description);
		}

		//prevent from reloading page on submission
		event.preventDefault();
	}

	return (
		<div>
			<Link to='/home'>Home</Link>
			<h2>Upload an image!</h2>
			<form>
				<input type="file" onChange = {onChange} />
			</form>
			<h2>Write something that describes you (10 words max)</h2>
			<form onSubmit={handleTextUpload}>
				<textarea value={description} onChange={handleTextChange} />
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
	
}
