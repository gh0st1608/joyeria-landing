import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumbs";
import Footer from "../layouts/Footer";
import ContactForm from "../sections/contact/Content";

const Contact = () => {
  return (
    <div>
      <MetaTags>
        <title>Peru Joyas | Contact Us</title>
        <meta name="description" content="Get in touch with us for any inquiries." />
      </MetaTags>
      <Header />
      <Breadcrumb breadcrumb={{ pagename: "Contact Us" }} />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
