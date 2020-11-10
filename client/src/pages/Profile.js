import React, { useState } from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import { FIREBASE_CONFIG } from '../config.js';

export default function Profile(props) {
	const [image, setImage] = useState("");

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

	//TODO 
	//this will upload image to firebase storage, I want to hash it with userID
	const handleUpload = (event) => {
		//prevent from reloading page on submission
		event.preventDefault();

		console.log("Starting upload");
		const upload = storage.ref(`pix/test`).put(image);
	}

	return (
		<div>
			<Link to='/home'>Home</Link>
			<form>
				<input type="file" onChange = {onChange} />
			</form>
		</div>
	)
	
}
