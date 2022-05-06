import React from 'react';
import logo from './logo.svg';
import './App.css';
import {TestSSE} from "./components/TestSSE";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    <TestSSE/>
                </p>
            </header>
        </div>
    );
}

export default App;
