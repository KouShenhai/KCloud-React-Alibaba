import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter} from "react-router-dom";
import store from "@/redux/store";
import App from './App';
import axios from '@/utils/axios';
import { loginStateCheck } from '@/configs/loginStateCheck'
// 将axios实例设置为全局变量
window.$axios = axios;
// window.loginStateCheck = loginStateCheck()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>);


