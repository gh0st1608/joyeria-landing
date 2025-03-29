import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import Sidebar from "../../layouts/Shopsidebar";
import { getProductsByParams, getProducts } from "../../servicios/shop/productService";
import { CartContext } from "../../../context/CartContext";
import { FaEye } from "react-icons/fa";
import "@fortawesome/fontawesome-free/css/all.min.css"; // ✅ Importamos FontAwesome

class Content extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 8, // ✅ Paginación con 8 productos por página
      searchQuery: "",
      selectedColors: [],
    };
  }

  async componentDidMount() {
    try {
      const products = await getProducts();
      console.log("📢 Productos cargados:", products.length);
      this.setState({ products, filteredProducts: products, loading: false });
    } catch (error) {
      console.error("❌ Error cargando productos:", error);
      this.setState({ loading: false });
    }
  }

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query }, this.filterProducts);
  };

  handleFilterChange = async ({ title, colors, price }) => {
    this.setState({ searchQuery: title, selectedColors: colors, loading: true });

    try {
      const params = {};
      if (title) params.title = title;
      if (colors.length > 0) params.color = colors.join(",");
      if (price) params.price = price;

      const products = (await getProductsByParams(params)) || [];
      console.log("📢 Productos filtrados:", products.length);

      this.setState({ products, filteredProducts: products, loading: false, currentPage: 1 });
    } catch (error) {
      console.error("❌ Error filtrando productos:", error);
      this.setState({ loading: false, filteredProducts: [] });
    }
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

    console.log("📢 Productos después del filtrado:", filtered.length);
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
    const currentProducts = (filteredProducts || []).slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <section className="shop-section">
        <div className="shop-container">
          {/* 🔹 Sidebar de Filtros */}
          <div className="">
            <Sidebar onFilterChange={this.handleFilterChange} />
          </div>

          {/* 🔹 Productos */}
          <div className="product-container">
            <h2 className="product-count">🛍 {filteredProducts.length} Productos</h2>

            {loading ? (
              <p className="loading-text">Cargando productos...</p>
            ) : (
              <div className="product-grid">
                {currentProducts.length > 0 ? (
                  currentProducts.map((item) => (
                    <div key={item.id} className="product-card">
                      {/* Etiquetas de "Sale" o "New" */}
                      {item.discount && <span className="discount-tag">-{item.discount}%</span>}
                      {item.isNew && <span className="product-badge">Nuevo</span>}

                      <img
                        src={item.image}
                        alt={item.title}
                        className="product-image"
                      />

                      <div className="product-details">
                        <h3 className="product-name">{item.title}</h3>
                        <h4 className="product-category">{item.category}</h4>
                        <h4 className="product-color">{item.color}</h4>
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
                  ))
                ) : (
                  <p className="no-products"> No hay productos disponibles.</p>
                )}
              </div>
            )}

            {/* 🔹 Paginación */}
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
