import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

export default function Profile(props) {
	const [image, setImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [bio, setBio] = useState("");
	const [uid, setUid] = useState("");

	//reference to storage service
	let storage = firebase.storage();
	const ref = React.useRef();

	useEffect(() => {
		//I think there should be a better way to verify that the user is always logged in to render component
		//we need to redirect/do something different if user is not logged in.
		firebase.auth().onAuthStateChanged(function(user) {
			if (user != null) {
				setUid(user.uid);
				storage.ref("pix").child(uid).getDownloadURL().then(url => {
					setImageUrl({url});
				})	
			}
			else
				console.log("not logged in");
		});
	});

	
	
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
					ref.current.value = "";
					console.log("done uploading");
				})
			})
	}

	//TODO
	//this will upload bio to cloud firestore
	const handleBioUpload = (event) => {

		//only length of 10 or less
		if(bio.split(" ").length > 10) {
			alert("Your description is too long!");
		} else {
			alert("You just updated your description with: " + bio);
		}

		//prevent from reloading page on submission
		event.preventDefault();
		const db = firebase.firestore();
		db.settings({
			timestampsInSnapshots: true
		});
		const userRef = db.collection("users").add({
			uid: uid,
			bio: bio
		});

	}


	return (
		<div>
			<Link to='/home'>Home</Link>
			<h1>Welcome user: {uid}</h1>
			<img src={imageUrl.url} />
			<h2>Upload an image!</h2>
				<form onSubmit={handleImageUpload}>
					<input type="file" ref = {ref} onChange = {handleImageChange} />
					<button>upload</button>
				</form>
			<h2>Write something that describes you (10 words max)</h2>
			<form onSubmit={handleBioUpload}>
				<textarea value={bio} onChange={handleTextChange} />
				<input type="submit" value="Submit" />
			</form>
		</div>
	)
	
}
