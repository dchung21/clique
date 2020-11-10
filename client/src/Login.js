import React from 'react';
import { FIREBASE_CONFIG } from './config.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

console.log(FIREBASE_CONFIG);
if (!firebase.apps.length) {
	firebase.initializeApp(FIREBASE_CONFIG);
}

const uiConfig = {
	signInFlow: 'popup',
	signInSuccessUrl: '/signedIn',
  signInOptions: [
	firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

const approvedDomain = ".edu"; // We only allow people with emails ending in ".edu" to register for an account.

const email = "test@mcronalds.edu"; // will be replaced with something grabbing email entered from sign up page
// is the email entered on the account registration page

if (email.toLowerCase().endsWith(approvedDomain)) {
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
