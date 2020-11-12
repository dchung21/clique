import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export default function Chat(props) {
    const auth = firebase.auth();
    const firestore = firebase.firestore();

    const messagesRef = firestore.collection(props.location.state.convoRef);
    const query = messagesRef.orderBy('timestamp_ms', 'desc').limit(50);

    const [messages] = useCollectionData(query, {idField: 'id'});

    console.log("convoRef: ", props.location.state.convoRef);

	return (
        <div>
            <Link to='/home'>Home</Link>
            <h2>Chat</h2>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>
        </div>
	)
	
}

function ChatMessage(props) {
    const { content, uid } = props.message;

    return <p>{content}</p>
}