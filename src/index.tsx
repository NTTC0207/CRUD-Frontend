import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';

import './react-i18next-config'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>

    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Router>
);


reportWebVitals();
