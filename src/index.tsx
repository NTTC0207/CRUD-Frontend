import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import { Auth0Provider } from '@auth0/auth0-react';
import './react-i18next-config'

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


reportWebVitals();
