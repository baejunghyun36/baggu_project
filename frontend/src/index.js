import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// tailwind
import GlobalStyles from './styles/GlobalStyles';
import './index.css';
// import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
