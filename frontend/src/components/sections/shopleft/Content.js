import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import Sidebar from "../../layouts/Shopsidebar";
import { getProducts } from "../../servicios/shop/productService";
import { CartContext } from "../../../context/CartContext";
import { FaEye } from "react-icons/fa";

import '@fortawesome/fontawesome-free/css/all.min.css'; // ✅ Importamos FontAwesome



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
        <div className="shop-container">

          {/* Filtros en la izquierda */}
          <div className="">
            <Sidebar
              onSearchChange={this.handleSearchChange}
              onFilterChange={this.handleColorFilterChange}
            />
          </div>

          {/* Productos a la derecha */}
          <div className="product-container">
            <h2 className="product-count">🛍 {filteredProducts.length} Productos</h2>
            {loading ? (
              <p className="loading-text">Cargando productos...</p>
            ) : (
              <div className="product-grid">
                {currentProducts.map((item) => (
                  <div key={item.id} className="product-card">
                    {/* Etiquetas de "Sale" o "New" */}
                    {item.discount && <span className="discount-tag">-{item.discount}%</span>}
                    {item.isNew && <span className="product-badge">New</span>}

                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.title}
                      className="product-image"
                    />

                    <div className="product-details">
                      <h3 className="product-name">{item.title}</h3>
                      <p className="product-price">
                        S/ {item.price.toFixed(2)}{" "}
                        {item.oldPrice && <span className="old-price">S/ {item.oldPrice.toFixed(2)}</span>}
                      </p>

                      <div className="product-buttons">
                        <Link to={`/shop-detail/${item.id}`} className="btn btn-options">
                          <FaEye style={{ marginRight: "5px" }} /> Ver Opciones
                        </Link>
                        <button
                          className="btn btn-cart"
                          onClick={() => addToCart({ ...item, quantity: 1 })}
                        >
                          <i className="fa-solid fa-cart-plus"></i> Agregar al carrito
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
      </section>
    );
  }
}

export default Content;
