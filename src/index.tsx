import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from './shared/theme';

import App from './App';
import GlobalStyle from './global/GlobalStyle';
import reportWebVitals from './reportWebVitals';

import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
);
reportWebVitals();
