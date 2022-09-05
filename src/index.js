import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './global/GlobalStyle';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from 'styled-components';
import theme from './shared/theme';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
         <GlobalStyle />
       <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </Provider>
    

);
reportWebVitals();
