import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumbs";
import Content from "../sections/contact/Content";


const Contact = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Peru Joyas | Contact Us</title>
        <meta name="description" content="Get in touch with us" />
      </MetaTags>
      <Header />
      <Breadcrumb breadcrumb={{ pagename: "Contact Us" }} />
    </Fragment>
  );
};

export default Contact;
