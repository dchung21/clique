import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

const { REACT_APP_FIREBASE_CONFIG } = process.env;

if (!firebase.apps.length) {
	firebase.initializeApp(REACT_APP_FIREBASE_CONFIG);
}

const uiConfig = {
	signInFlow: 'popup',
	signInSuccessUrl: '/signedIn',
  signInOptions: [
	firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

const approvedDomain = "edu";

const testEmail = "test@mcronalds.edu"; // will be replaced with something grabbing email entered from sign up page

if (testEmail.split(".")[1] === approvedDomain) { // this split may not work if their domain has multiple periods, consider extracting last three characters instead
	//create account for them
} else {
	//display error saying they should be registering with only an .edu address
}

export default function LoginPage (props) {
	return (
		<div>
			<h1>My app</h1>
			<p>Sign in</p>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
		</div>
	);
}
