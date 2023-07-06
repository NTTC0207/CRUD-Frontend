import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <Auth0Provider
    domain="dev-0ztm3v8co54it1fh.us.auth0.com"
    clientId="x79lZeiAkcOpDbQ1GkHlWaH42QB9RpE4"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <CookiesProvider>
      <App />
    </CookiesProvider>
    </Auth0Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
