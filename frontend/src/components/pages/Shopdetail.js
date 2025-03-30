import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../sections/home/Breadcrumbs';
import Content from "../sections/shopdetail/Content"; // Asegúrate de importar correctamente este componente

class Shopdetail extends Component {
  render() {
      return (
          <Fragment>
              <MetaTags>
                  <title>Laramiss | Shop Detail</title>
                  <meta
                      name="description"
                      content="#"
                  />
              </MetaTags>
              <Header/>
              <Breadcrumb breadcrumb={{pagename:'Shop Detail'}}/>
              <Content/>
          </Fragment>
      );
  }
}

export default Shopdetail;

/* const Shopdetail = (props) => {
  const _id = props.match?.params?._id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!_id) {
      console.error("❌ _id no recibido");
      return;
    }

    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    const encontrado = productosGuardados.find((p) => p._id === _id);

    if (encontrado) {
      console.log("✅ Producto encontrado:", encontrado);
      setProduct(encontrado);
    } else {
      console.error("❌ Producto no encontrado con _id:", _id);
    }
  }, [_id]);

  if (!product) {
    return (
      <p style={{ color: "red" }}>
        <span role="img" aria-label="advertencia">⚠️</span> Producto no encontrado
      </p>
    );
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width="300" />
      <p>{product.description}</p>
      <p><strong>Precio:</strong> S/ {product.price.toFixed(2)}</p>
      <ShopInfo product={product} />
    </div>
  );
};

export default Shopdetail;
 */