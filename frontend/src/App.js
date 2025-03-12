// ✅ Verifica si la carpeta es "services"
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/pages/Home';
// import About from './components/pages/About';
import Aboutv2 from 'components/pages/Aboutv2';
import Account from './components/pages/Account';
import Cart from './components/pages/Cart';
import Checkout from './components/pages/Checkout';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/Dashboard';
import Register from './components/pages/Register';
import Shopdetail from './components/sections/shopdetail/Content';
import Shopleft from './components/pages/Shopleft';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { getProducts } from "./components/servicios/shop/productService"; // ✅ Importa la API de productos
import Footer from "./components/layouts/Footer";
// import Sidebar from "./components/layouts/Sidebar";
import Products from './components/pages/Products';
import Users from './components/pages/Users';
import Clients from './components/pages/Clients';

function App() {
  // const [setProductos] = useState([]);

  useEffect(() => {
    let isMounted = true; // ✅ Evitar actualización de estado en componente desmontado

    async function fetchProducts() {
      try {
        const products = await getProducts();
        if (isMounted) {
          console.log("Productos obtenidos:", products);
          // setProductos(products);
        }
      } catch (error) {
        console.error("❌ Error cargando productos:", error);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false; // ✅ Cancelar actualización si el componente se desmonta
    };
  },
  );

  return (
    <AuthProvider>
      <CartProvider>

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={Aboutv2} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/contact" component={Contact} />

            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/account" component={Account} />

            <Route exact path="/shop-left" component={Shopleft} />
            <Route exact path="/shop-detail/:id" component={Shopdetail} />


            {/* Dashboard de Administración */}
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/products" component={Products} />
            <Route exact path="/dashboard/users" component={Users} />
            <Route exact path="/dashboard/clients" component={Clients} />
          </Switch>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;