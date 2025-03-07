import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import Sidebar from "../../layouts/Shopsidebar";
import { getProducts } from "../../servicios/shop/productService";
import { CartContext } from "../../../context/CartContext";

class Content extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 6,
      searchQuery: "",
      selectedColors: [],
    };
  }

  async componentDidMount() {
    try {
      const products = await getProducts();
      console.log("📢 Productos recibidos:", products);
      this.setState({ products, filteredProducts: products, loading: false });
    } catch (error) {
      console.error("❌ Error cargando productos", error);
      this.setState({ loading: false });
    }
  }

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query }, this.filterProducts);
  };

  handleColorFilterChange = (colors) => {
    this.setState({ selectedColors: colors }, this.filterProducts);
  };

  filterProducts = () => {
    const { products, searchQuery, selectedColors } = this.state;
    
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        selectedColors.includes(product.color.toLowerCase())
      );
    }

    this.setState({ filteredProducts: filtered, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { filteredProducts, loading, currentPage, itemsPerPage } = this.state;
    const { addToCart } = this.context;

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <section className="shop-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <Sidebar
                onSearchChange={this.handleSearchChange}
                onFilterChange={this.handleColorFilterChange}
              />
            </div>

            <div className="col-lg-9 col-md-8">
              <h2 className="product-count">🛍 {filteredProducts.length} Productos</h2>
              {loading ? (
                <p className="loading-text">Cargando productos...</p>
              ) : (
                <div className="product-grid">
                  {currentProducts.map((item) => (
                    <div key={item.id} className="product-card">
                      <div className="product-header">
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.title}
                          className="product-image"
                          onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                        />
                        <button className="favorite-btn">❤️</button>
                      </div>

                      <div className="product-colors">
                        <span className="color-option" style={{ backgroundColor: item.color }}></span>
                      </div>

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
                <Pagination
                  totalItems={filteredProducts.length}
                  itemsPerPage={itemsPerPage}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Content;
