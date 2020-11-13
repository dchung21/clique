import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

export default function Profile(props) {
	const [image, setImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [displayBio, setDisplayBio] = useState("");
	const [bio, setBio] = useState("");
	const [uid, setUid] = useState("");

	//reference to storage service
	let storage = firebase.storage();
	let fs = firebase.firestore();

	useEffect(() => {
		//I think there should be a better way to verify that the user is always logged in to render component
		//we need to redirect/do something different if user is not logged in.
		 async function fetchData() {
			 firebase.auth().onAuthStateChanged(function(user) {
				if (user != null) {
					setUid(user.uid);
					storage.ref("pix").child(user.uid).getDownloadURL().then(url => {
						setImageUrl({url});
						//get bio after getting image
						fs.collection("users").where("uid", "==", user.uid)
						.get()
						.then(function(querySnapshot) {
							querySnapshot.forEach(function(doc) {
								setDisplayBio(doc.get("bio"));
							});
						});		

					}).catch(error => {
						console.log("Error: " + error);
						setImageUrl({url: "https://firebasestorage.googleapis.com/v0/b/yhacks-d4ca5.appspot.com/o/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg?alt=media&token=57e31b47-db10-405c-af9f-01ae8de4587f"});
					});
			
				}
				else
					console.log("not logged in");
			});
		}
	
		fetchData();
	}, []);

	//on selection of image from the user
	const handleImageChange = (event) => {
		if (event.target.files[0]) {
			const image = event.target.files[0];
			setImage(image);
			
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
					console.log("done uploading");
				})
			})
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
					console.log("done uploading");
				})
			})
	}

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

			const bios = db.collection("users");

			// get all bios with uid == uid
			bios.where("uid", "==", uid)
				.get()
				.then(querySnapshot => {
					let count = 0;
					// go through query results, updating the count each time
					querySnapshot.forEach(doc => {
						console.log("Updated bio");
						setDisplayBio(bio);
						bios.doc(doc.id).set({
							uid: uid,
							bio: bio
						})
						count++;
					})

					// bad, too many bios
					if(count > 1) {
						console.log("Wierd, you seem to have more than one bio?");
					} else if (count === 0) { // no bio yet, so add it in
						console.log("Added bio");
						bios.add({
							uid: uid,
							bio: bio
						});
					}
				}).catch(error => {
					console.log("Error getting the previous bios: ", error);
				});
		}

		//prevent from reloading page on submission
		event.preventDefault();
	}
	const hiddenFileInput = React.useRef(null);

	const handleClick = event => {
		hiddenFileInput.current.click();
	};

	return (
		<Container className="d-flex justify-content-center align-items-center min-vh-100">
			<div className="w-75 h-80">
				<h3 className="text-center py-3">Welcome user: {uid}</h3>
				<div className="d-flex justify-content-center">
				<OverlayTrigger
						placement="top"
						delay={{ show: 250, hide: 400 }}
						overlay={<Tooltip id="button-tooltip-2">click to change profile</Tooltip>}
					>
					<Button variant = "" onClick = {handleClick}><Image className="w-50 h-50" src={imageUrl.url}/></Button>
					</OverlayTrigger>
					<input
					type="file"
					ref={hiddenFileInput}
					onChange={handleImageChange}
					style={{display: 'none'}}
					/>
				</div>
				<h4 className="text-center py-3">{displayBio}</h4>
				<Form onSubmit={handleBioUpload} className="py-3">
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
	);
}
