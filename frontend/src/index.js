import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from "@apollo/react-hooks"
import client from "./ApolloProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
);
