import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SessionStorage from "../utils/storage";
import { Spin, message } from "antd";
import "../styles/loading.less";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// 显示加载动画
function showLoading() {
  // 获取当前主题
  const theme = SessionStorage.getValue("theme");
  const dom = document.createElement("div");
  if (theme === "dark") {
    dom.style.backgroundColor = "rgba(15, 21, 39, 0.3)";
  }
  dom.setAttribute("id", "loading");
  document.body.appendChild(dom);
  ReactDOM.render(
    <Spin indicator={antIcon} tip="加载中..." size="large" />,
    dom
  );
}
// 隐藏加载动画
function hideLoading() {
  document.body.removeChild(document.getElementById("loading") as Node);
}

axios.defaults.baseURL = window.location.origin + "/dne/v1.0";
axios.defaults.timeout = 1000 * 2 * 60;
axios.defaults.method = "get";

let requestUrlNum = 0;

axios.interceptors.request.use(
  (config) => {
    // Loading组件
    if (requestUrlNum < 1) {
      showLoading();
    }
    requestUrlNum++;
    // TOKEN
    const token = "abc";
    config.headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };
    return config;
  },
  (error) => {
    requestUrlNum--;
    if (requestUrlNum < 1) {
      hideLoading();
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    requestUrlNum--;
    if (requestUrlNum < 1) {
      hideLoading();
    }
    // 当后端返回的是文件流时
    const headers = response.headers;
    if (headers["content-type"] === "application/octet-stream") {
      return response.data;
    }
    // 一般返回（文件流没有code这个属性）
    if (response.data.code === 0) {
      return response.data;
    }
  },
  (error) => {
    requestUrlNum--;
    if (requestUrlNum < 1) {
      hideLoading();
    }
    if (axios.isCancel(error)) {
      // 中断promise链接
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return new Promise(() => {});
    }
    if (error.response?.status === 504) {
      error.response && message.error(error.response.statusText, 8);
    } else if (error.response?.status === 500) {
      if (error.response.data && error.response.data.code === 1007) {
        setTimeout(() => {
          SessionStorage.clear();
          window.location.replace("/");
        }, 2000);
      } else {
        error.response &&
          message.error(
            error.response.data.error || error.response.data.data,
            8
          );
      }
    } else if (error.response?.status === 405) {
      error.response && message.error(error.response.data.error, 8);
    } else {
      message.error(error.message);
    }
  }
);

export default axios;
