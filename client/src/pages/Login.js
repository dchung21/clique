import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/");
        } catch {
            setError("Failed to sign in!");
        }

        setLoading(false);
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Log In</h2>
                    {error && <Alert variant = "danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref = {emailRef} required></Form.Control>
                        </Form.Group>

                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref = {passwordRef} required></Form.Control>
                        </Form.Group>

                        <Button disabled = {loading} className = "w-100" type = "submit">Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Need an account? <Link to ="signup">Sign Up</Link>
            </div>
        </>
    )
}

// import React from 'react';
// import { FIREBASE_CONFIG } from '../config.js';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import Container from 'react-bootstrap/Container'

// if (!firebase.apps.length) {
// 	firebase.initializeApp(FIREBASE_CONFIG);
// }

// const uiConfig = {
// 	signInFlow: 'popup',
// 	signInSuccessUrl: '/home',
//   signInOptions: [
// 	firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ]
// };

// const approvedDomain = ".edu"; // We only allow people with emails ending in ".edu" to register for an account.

// const email = "test@mcronalds.edu"; // will be replaced with something grabbing email entered from sign up page
// // is the email entered on the account registration page

// if (email.toLowerCase().endsWith(approvedDomain)) {
// 	//create account for them
// } else {
// 	//display error saying they should be registering with only an .edu address
// }

// function SignIn() {
// 	// Get elements.
// 	const txtEmail = document.getElementById('txtEmail');
// 	const txtPassword = document.getElementById('txtPassword');
// 	const btnLogin = document.getElementById('btnLogin');
// 	const btnSignup = document.getElementById('btnSignUp');
// 	const btnLogout = document.getElementById('btnLogout');

// 	// Add login event.
// 	btnLogin.addEventListener('click', e => {
// 		// Get email and password.
// 		const email = txtEmail.value;
// 		const password = txtPassword.value;
// 		const auth = firebase.auth();

// 		// Sign in.
// 		const promise = auth.signInWithEmailAndPassword(email, password);
// 		promise.catch(e => console.log(e.message));
// 	});

// 	btnSignup.addEventListener('click', e => { 
// 		// Get email and password.

// 		// TODO: Check that email is legit .edu email.
// 		const email = txtEmail.value;
// 		const password = txtPassword.value;
// 		const auth = firebase.auth();

// 		// Sign in.
// 		const promise = auth.createUserWithEmailAndPassword(email, password);
// 		promise.catch(e => console.log(e.message));
// 	});

// 	btnLogout.addEventListener('click', e => {
// 		firebase.auth.signOut();
// 	})

// 	// Add a realtime listener.
// 	firebase.auth().onAuthStateChanged(firebaseUser => {
// 		if (firebaseUser) {
// 			console.log(firebaseUser);
// 			btnLogout.classList.remove('hide');
// 		} else {
// 			console.log("not logged in");
// 			btnLogout.classList.add('hide');
// 		}
// 	});
// }

// export default function LoginPage (props) {
// 	return (
// 		<Container className="d-flex justify-content-center align-items-center min-vh-100">
// 			<div>
// 				<h1 className="text-center">Sign in</h1>
// 				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
// 			</div>
// 		</Container>
// 	);
// }
