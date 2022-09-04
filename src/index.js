import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './global/GlobalStyle';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
<GlobalStyle />
    <App />
    </Provider>
    

);
reportWebVitals();
