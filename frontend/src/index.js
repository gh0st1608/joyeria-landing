import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from './context/AuthContext';
// Css

import './assets/css/style.css';
import './assets/css/home.css';
import './assets/css/about.css';
import './assets/css/catalog.css';

import './assets/css/contact.css';
import './assets/css/login.css';
import './assets/css/carrito.css';


ReactDOM.render(
  <AuthProvider> {/* Envuelve App con AuthProvider */}
    <CartProvider>
      <App />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </CartProvider>,
  </AuthProvider>,
  document.getElementById('laramiss')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
