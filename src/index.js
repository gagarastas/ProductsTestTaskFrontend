import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserHistory} from 'history'
import {Router} from "react-router-dom";

const history = createBrowserHistory()

ReactDOM.render(
  <Router history = {history}>
    <App />
  </Router>,
  document.getElementById('root')
);


reportWebVitals();
