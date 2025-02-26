import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Account from './components/pages/Account';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Contact from './components/pages/Contact';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Shopdetail from './components/pages/Shopdetail';
import Shopleft from './components/pages/Shopleft';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; 
import { getProducts } from "./components/servicios/shop/productService"; // ✅ Importa la API de productos
import Header from "./components/layouts/Header"; 
import Footer from "./components/layouts/Footer";


function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    let isMounted = true; // ✅ Evitar actualización de estado en componente desmontado

    async function fetchProducts() {
      try {
        const products = await getProducts();
        if (isMounted) {
          console.log("📢 Productos obtenidos:", products);
          setProductos(products);
        }
      } catch (error) {
        console.error("❌ Error cargando productos:", error);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false; // ✅ Cancelar actualización si el componente se desmonta
    };
  }, []);

  return (
    <AuthProvider>
    <CartProvider>
      <Router>
      <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/contact" component={Contact} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/account" component={Account} />
        
          <Route exact path="/shop-left" component={Shopleft} />
          <Route exact path="/shop-detail/:id" component={Shopdetail} /> {/* ✅ Corregida la ruta */}

        </Switch>
        <Footer />
      </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
