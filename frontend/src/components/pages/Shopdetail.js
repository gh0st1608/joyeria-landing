import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../sections/home/Breadcrumbs';
import Content from "../sections/shopdetail/Content"; // Asegúrate de importar correctamente este componente
import "../../assets/css/ShopDetail.css"; // Asegúrate de que la ruta sea correcta


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