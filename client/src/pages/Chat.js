import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Chat(props) {
    const [messagesRef, setMessagesRef] = useState("");

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    if(this.props.location.state.convoRef) {
        setMessagesRef(firestore.collection(this.props.location.state.convoRef));
    }
    


	return (
        <div>
            <Link to='/home'>Home</Link>
            <h2>Chat</h2>
        </div>
	)
	
}