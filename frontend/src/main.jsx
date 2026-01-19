// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import {Provider} from "react-redux"
// import store from "./store/store.js"

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
// )


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import axios from "axios";

/* =========================
   AXIOS GLOBAL CONFIG
   (THIS FIXES CORS + COOKIES)
   ========================= */
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
/* ========================= */

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
