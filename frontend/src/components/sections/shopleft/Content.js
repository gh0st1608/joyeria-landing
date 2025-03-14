import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import Sidebar from "../../layouts/Shopsidebar";
import { getProductsByParams, getProducts } from "../../servicios/shop/productService";
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
      itemsPerPage: 8, // ✅ Cambiado a 8 productos por página
      searchQuery: "",
      selectedColors: [],
      //price: 500, // Filtro de precio
    };
  }

  async componentDidMount() {
    try {
      const products = await getProducts();
      console.log("📢 Productos cargados:", products.length); // ✅ Verifica cuántos productos hay
      this.setState({ products, filteredProducts: products, loading: false });
    } catch (error) {
      console.error("❌ Error cargando productos", error);
      this.setState({ loading: false });
    }
  }

  handleSearchChange = (query) => {
    this.setState({ searchQuery: query }, this.filterProducts);
  };

  handleFilterChange = async ({title, colors, price }) => {
    this.setState({ searchQuery: title, price: price, selectedColors: colors, loading: true });

  try {
    const colorQuery = colors.length > 0 ? colors.join(",") : "";
    const params = {};
    if (title) params.title = title;
    if (colorQuery) params.color = colorQuery;
    if (price) params.price = price; 
    /* const colorQuery = colors.length > 0 ? colors.join(",") : ""; // Si hay varios colores, los une en una string*/
    const products = await getProductsByParams(params) || []; // Llamada a la API con los colores como parámetro 
    console.log('products content',products)
    this.setState({ products, filteredProducts: products, loading: false, currentPage: 1 });
  } catch (error) {
    console.error("❌ Error filtrando productos por color", error);
    //this.setState({ loading: false });
    this.setState({ loading: false, filteredProducts: [] });
  }
    //this.setState({ selectedColors: colors }, this.filterProducts);
  };

  filterProducts = () => {
    const { products, searchQuery, selectedColors, price } = this.state;
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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

    // Filtrado por precio
    if (price) {
      filtered = filtered.filter((product) => product.price <= price);
    }

    console.log("📢 Productos después del filtrado:", filtered.length); // ✅ Verifica si se filtran correctamente

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
    //const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
      <section className="shop-section">
        <div className="shop-container">

          {/* Filtros en la izquierda */}
          <div className="">
            <Sidebar
              onFilterChange={this.handleFilterChange}
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
                      <h3 className="product-name">{item.category}</h3>
                      <h3 className="product-name">{item.color}</h3>
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
                itemsPerPage={itemsPerPage} // ✅ Asegura que Pagination reciba 8 productos por página
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
