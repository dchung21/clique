import React from 'react';
import { Link } from "react-router-dom";

export default function Convos() {

	return (
        <div>
            <Link to='/home'>Home</Link>
            <h2>Convos</h2>
            <nav>
                <ul>
                    <Link to='/chat'>Convo 1</Link>
                </ul>
            </nav>
        </div>
	)
	
}