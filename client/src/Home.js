import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Home() {

	return (
        <div>
            <nav>
                <ul>
                    <Link to='/match'>Match</Link>
                </ul>
                <ul>
                    <Link to='/convos'>Chat</Link>
                </ul>
                <ul>
                    <Link to='/profile'>Profile</Link>
                </ul>
            </nav>
        </div>
	)
	
}