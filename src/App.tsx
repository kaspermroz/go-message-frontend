import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TestSSE } from "./components/TestSSE";
import { Form } from "./components/Form";
import { UserChats } from "./components/UserChats";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <TestSSE/>
                    <UserChats />
                </p>
                <Form />
            </header>
        </div>
    );
}

export default App;
