import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {

	return (
        <div>
            <h2>You successfully signed in user</h2>
            <nav>
                <ul>
                    <Link to='/match'>Match</Link>
                </ul>
                <ul>
                    <Link to='/convos'>Conversations</Link>
                </ul>
                <ul>
                    <Link to='/profile'>Profile</Link>
                </ul>
            </nav>
        </div>
	)
	
}