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

export default function LoginPage (props) {
	return (
		<div>
			<h1>My app</h1>
			<p>Sign in</p>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
		</div>
	);
}
