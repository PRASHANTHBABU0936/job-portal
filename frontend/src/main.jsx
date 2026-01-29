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

import config from "./config.js";

/* =========================
   AXIOS GLOBAL CONFIG
   (THIS FIXES CORS + COOKIES)
   ========================= */
axios.defaults.baseURL = config.API_URL;
axios.defaults.withCredentials = true;
/* ========================= */

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
