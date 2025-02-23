import React, { Component } from "react";
import Shopinfo from "./Shopinfo";
import { getProductById } from "../../servicios/api"; // ✅ Importamos la API

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const { productId } = this.props; // ✅ Captura el ID del producto

    try {
      console.log("📢 Buscando producto con ID:", productId);
      const product = await getProductById(productId);

      if (product) {
        console.log("📢 Producto encontrado:", product);
        this.setState({ product, loading: false });
      } else {
        console.log("❌ Producto no encontrado");
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error("❌ Error cargando el producto", error);
      this.setState({ loading: false });
    }
  }

  render() {
    const { product, loading } = this.state;

    return (
      <div>
        {loading ? (
          <p>Cargando producto...</p>
        ) : product ? (
          <Shopinfo product={product} />
        ) : (
          <h3 style={{ textAlign: "center", color: "red" }}>⚠️ Producto no encontrado</h3>
        )}
      </div>
    );
  }
}

export default Content;
