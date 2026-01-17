import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import {AuthUserContextProvider} from "./context/auth.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthUserContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthUserContextProvider>
);

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router-dom';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter> 
//     <App />
//     </BrowserRouter> 
//   </StrictMode>,
// )
