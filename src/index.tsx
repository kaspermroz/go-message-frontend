import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';
import {ChakraProvider} from "@chakra-ui/react";
import {Auth0Provider} from "@auth0/auth0-react";

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error("Failed to find the root element")
}

const root = ReactDOM.createRoot(rootElement)
const domain = process.env.REACT_APP_AUTH0_DOMAIN ?? ''
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''

root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
        >
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </Auth0Provider>
    </React.StrictMode>,
);
