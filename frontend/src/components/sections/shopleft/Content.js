import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import Sidebar from "../../layouts/Shopsidebar";
import { getProducts } from "../../servicios/products";
import { CartContext } from "../../../context/CartContext";

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
      console.log("📢 Products received:", products);
      this.setState({ products, loading: false });
    } catch (error) {
      console.error("❌ Error loading products", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { products, loading } = this.state;
    const { addToCart } = this.context;

    return (
      <section className="Shop-section pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-10 col-sm-10">
              <Sidebar />
            </div>
            <div className="col-lg-8 col-md-10">
              {loading ? (
                <p>Loading products...</p>
              ) : (
                <div className="shop-products-wrapper">
                  <div className="shop-product-top">
                    <p>Showing {products.length} products</p>
                  </div>
                  <div className="product-wrapper restaurant-tab-area">
                    <div className="row">
                      {products.map((item) => (
                        <div key={item.id} className="col-lg-6 col-md-6 mb-4">
                          <div className="food-box shop-box">
                            <div className="thumb">
                              <img
                                src={item.image || "https://via.placeholder.com/150"}
                                alt={item.titlte}
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />
                            </div>
                            <div className="desc text-center">
                              <h4>
                                <Link to={`/shop-detail/${item.id}`}>{item.title}</Link>
                              </h4>
                              <p>{item.description}</p>
                              <span className="price">${item.price}</span>

                              {/* ✅ Botón para ver más detalles */}
                              <Link to={`/shop-detail/${item.id}`} className="btn btn-primary">
                                🔍 Ver detalles
                              </Link>

                              {/* ✅ Botón para agregar al carrito */}
                              <button
                                className="btn-add-to-cart"
                                onClick={() => {
                                  const productToCart = { ...item, quantity: 1 };
                                  console.log("🛒 Adding to cart:", productToCart);
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
                  </div>
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
