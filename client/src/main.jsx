
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

const root = ReactDOM.createRoot(document.getElementById('root')); // Assuming you have a 'root' div in your index.html
root.render(
  <Provider store={store}> 
    <App /> 

  </Provider>
);
