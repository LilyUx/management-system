import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import zhTW from "antd/es/locale/zh_TW";
import store from "./store";
import { ConfigProvider } from "antd";
import "antd/dist/antd.less";
import "./styles/reset.less";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ConfigProvider locale={zhTW}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
