import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// tailwind
import GlobalStyles from './styles/GlobalStyles';
import './styles/tailwind.css';
import './styles/global.css';
// import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
