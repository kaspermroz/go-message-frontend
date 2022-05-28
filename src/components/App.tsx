import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "../pages/login";
import { ChatPage } from "../pages/chat";
import '../styles/App.css';

function App() {
    const {isAuthenticated} = useAuth0()
    return (
        <div className="App">
            {isAuthenticated ? (<ChatPage />) : (<LoginPage />)}
        </div>
    );
}

export default App;
