import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyle from "./global/GlobalStyle";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import theme from "./shared/theme";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </Provider>
);

// ::: web-vitals 확인하기 ::: google analytics 연동해서 마케팅에 활용하면 좋을 것 같음.
reportWebVitals(console.log);
