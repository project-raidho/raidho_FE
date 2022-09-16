import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./global/GlobalStyle";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "styled-components";
import theme from "./shared/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ReactQueryDevtools initialIsOpen={true} />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);
reportWebVitals();
