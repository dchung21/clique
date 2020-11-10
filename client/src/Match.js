import React from 'react';
import { Link } from "react-router-dom";

export default function Match() {

	return (
        <div>
            <Link to='/home'>Home</Link>
            <h2>Matching Page</h2>
            <button>
                <Link to='/chat'>Chat</Link>
            </button>
            <button>next</button>
        </div>
	)
	
}