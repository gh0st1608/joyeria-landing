import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Páginas públicas
import Home from './components/pages/Home';
import Aboutv2 from './components/pages/Aboutv2';
import Account from './components/pages/Account';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Contact from './components/pages/Contact';
import Register from './components/pages/Register';
import Shopdetail from './components/pages/Shopdetail';
import Shopleft from './components/pages/Shopleft';

// Página de login con modal
import AuthModal from "./components/sections/auth/AuthModal";

// Dashboard
import Dashboard from './components/pages/Dashboard';
import Settings from './components/pages/Settings';
import Products from './components/pages/Products';
import Users from './components/pages/Users';
import Clients from "./components/pages/Clients";
import Profile from "./components/pages/Profile";
import Payments from "./components/pages/Payments";

// Layout
import Footer from "./components/layouts/Footer";
import { getProducts } from "./components/servicios/shop/productService";

// Ruta protegida
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

function App() {
  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        await getProducts();
        if (isMounted) {
          // datos cargados
        }
      } catch (error) {
        console.error("❌ Error cargando productos:", error);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <Switch>
          {/* Públicas */}
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={Aboutv2} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/shop-left" component={Shopleft} />
          <Route exact path="/shop-detail/:_id" component={Shopdetail} />

          {/* <Route exact path="/login" component={AuthPage} /> */}
          <Route exact path="/login" component={AuthModal} />

          {/* Protegidas */}
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboard/products" component={Products} />
          <PrivateRoute exact path="/dashboard/users" component={Users} />
          <PrivateRoute exact path="/dashboard/clients" component={Clients} />
          <PrivateRoute exact path="/dashboard/payments" component={Payments} />
          <PrivateRoute exact path="/dashboard/settings" component={Settings} />
          <PrivateRoute exact path="/dashboard/profile" component={Profile} />

          {/* Redirección por defecto */}
          <Redirect to="/login" />
        </Switch>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
