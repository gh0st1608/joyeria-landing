import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import Sidebar from "../../layouts/Shopsidebar";
import { getProducts } from "../../servicios/shop/productService";
import { CartContext } from "../../../context/CartContext";
// import "../../css/style.css"; // Importar estilos mejorados

class Content extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const products = await getProducts();
      console.log("📢 Productos recibidos:", products);
      this.setState({ products, loading: false });
    } catch (error) {
      console.error("❌ Error cargando productos", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { products, loading } = this.state;
    const { addToCart } = this.context;

    return (
      <section className="shop-section">
        <div className="container">
          <div className="row">
            {/* Sidebar (Búsqueda, Precio, Filtros) */}
            <div className="col-lg-3 col-md-4">
              <Sidebar />
            </div>

            {/* Contenido de Productos */}
            <div className="col-lg-9 col-md-8">
              <h2 className="product-count">🛍 {products.length} Productos</h2>
              {loading ? (
                <p className="loading-text">Cargando productos...</p>
              ) : (
                <div className="product-grid">
                  {products.map((item) => (
                    <div key={item.id} className="product-card">
                      {/* Imagen y Favorito */}
                      <div className="product-header">
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.title}
                          className="product-image"
                          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                        />
                        <button className="favorite-btn">❤️</button>
                      </div>

                      {/* Opciones de Color */}
                      <div className="product-colors">
                        <span className="color-option gold"></span>
                        <span className="color-option rose-gold"></span>
                        <span className="color-option silver"></span>
                      </div>

                      {/* Detalles del Producto */}
                      <div className="product-details">
                        <h3 className="product-name">{item.title}</h3>
                        <p className="product-description">{item.description}</p>
                        <span className="product-price">S/ {item.price.toFixed(2)}</span>

                        <div className="product-buttons">
                          <Link to={`/shop-detail/${item.id}`} className="btn btn-primary">
                            🔍 Ver Opciones
                          </Link>
                          <button
                            className="btn btn-cart"
                            onClick={() => {
                              const productToCart = { ...item, quantity: 1 };
                              console.log("🛒 Agregando al carrito:", productToCart);
                              addToCart(productToCart);
                            }}
                          >
                            🛒 Agregar al carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="pagination-wrap">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Content;
