import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../layouts/Pagination";
import Sidebar from "../../layouts/Shopsidebar";
import { getProducts } from "../../servicios/api";
import { CartContext } from "../../../context/CartContext"; // ✅ Importar el contexto

class Content extends Component {
  static contextType = CartContext; // ✅ Conectar con el contexto

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
      console.log("📢 Productos recibidos:", products); // ✅ Verifica que los productos lleguen
      this.setState({ products, loading: false });
    } catch (error) {
      console.error("❌ Error cargando productos", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { products, loading } = this.state;
    const { addToCart, cart } = this.context; // ✅ Obtener la función y el carrito desde el contexto

    return (
      <section className="Shop-section pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-10 col-sm-10">
              <Sidebar />
            </div>
            <div className="col-lg-8 col-md-10">
              {loading ? (
                <p>Cargando productos...</p>
              ) : (
                <div className="shop-products-wrapper">
                  <div className="shop-product-top">
                    <p>Mostrando {products.length} productos</p>
                  </div>
                  <div className="product-wrapper restaurant-tab-area">
                    <div className="row">
                      {products.map((item) => (
                        <div key={item.id} className="col-lg-4 col-md-6">
                          <div className="food-box shop-box">
                            <div className="thumb">
                              <img
                                src={item.image}
                                alt={item.title}
                                onError={(e) =>
                                  (e.target.src = "https://via.placeholder.com/150")
                                }
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />
                            </div>
                            <div className="desc">
                              <h4>
                                <Link to={`/shop-detail/${item.id}`}>{item.title}</Link>
                              </h4>
                              <p>{item.descripcion}</p>
                              <span className="price">${item.price}</span>
                              <button
                                className="main-btn btn-border"
                                onClick={() => {
                                  console.log("🛒 Agregando al carrito:", item); // ✅ Verificar que se ejecuta
                                  addToCart(item);
                                  console.log("📢 Carrito actualizado:", cart); // ✅ Verificar el carrito
                                }}
                              >
                                🛒 Agregar al Carrito
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

