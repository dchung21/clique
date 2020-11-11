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

function SignIn() {
	// Get elements.
	const txtEmail = document.getElementById('txtEmail');
	const txtPassword = document.getElementById('txtPassword');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignup = document.getElementById('btnSignUp');
	const btnLogout = document.getElementById('btnLogout');

	// Add login event.
	btnLogin.addEventListener('click', e => {
		// Get email and password.
		const email = txtEmail.value;
		const password = txtPassword.value;
		const auth = firebase.auth();

		// Sign in.
		const promise = auth.signInWithEmailAndPassword(email, password);
		promise.catch(e => console.log(e.message));
	});

	btnSignup.addEventListener('click', e => { 
		// Get email and password.

		// TODO: Check that email is legit .edu email.
		const email = txtEmail.value;
		const password = txtPassword.value;
		const auth = firebase.auth();

		// Sign in.
		const promise = auth.createUserWithEmailAndPassword(email, password);
		promise.catch(e => console.log(e.message));
	});

	btnLogout.addEventListener('click', e => {
		firebase.auth.signOut();
	})

	// Add a realtime listener.
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if (firebaseUser) {
			console.log(firebaseUser);
			btnLogout.classList.remove('hide');
		} else {
			console.log("not logged in");
			btnLogout.classList.add('hide');
		}
	});
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