import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './global/GlobalStyle';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyle />
    <App />
  </>
);
reportWebVitals();
