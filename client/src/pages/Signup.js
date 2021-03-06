import React, { useRef, useState } from 'react';
import firebase from 'firebase/app';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        const approvedDomain = ".edu"; // We only allow people with emails ending in ".edu" to register for an account.

        if (!emailRef.current.value.toLowerCase().endsWith(approvedDomain)) {
            return setError("You may only sign up with a '.edu' address!")
        }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password and Confirmed Password do not match!");
        }

        try {
            setError("");
            setLoading(true);

            await signup(emailRef.current.value, passwordRef.current.value).then(function(user) {
				const id = user.user.uid;
				const account = {
					uid: id,
					bio: "",
				}
			
				const fs = firebase.firestore();
				fs.collection("users").doc(id).set(account);
				fs.collection("users").doc(id).collection("matchedUsers").doc(id).set ({ uid: id });
			});
            history.push("/profile");
        } catch {
			
            setError("Failed to create an account!");
        }

        setLoading(false);
    }

    return (
        <div>
            <Card style = {{ width: "400px" }}>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign Up</h2>
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

                        <Form.Group id = "password-confirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type = "password" ref = {passwordConfirmRef} required></Form.Control>
                        </Form.Group>

                        <Button disabled = {loading} className = "w-100" type = "submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className = "w-100 text-center mt-2">
                Already have an account? <Link to ="login">Log In</Link>
            </div>
        </div>
    )
}
