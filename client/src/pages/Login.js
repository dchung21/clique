import React from 'react';
import { FIREBASE_CONFIG } from '../config.js';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import Container from 'react-bootstrap/Container'

if (!firebase.apps.length) {
	firebase.initializeApp(FIREBASE_CONFIG);
}

const uiConfig = {
	signInFlow: 'popup',
	signInSuccessUrl: '/home',
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
		<Container className="d-flex justify-content-center align-items-center min-vh-100">
			<div>
				<h1 className="text-center">Sign in</h1>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
			</div>
		</Container>
	);
}