// import Contact from "components/pages/Contact";

export const BASE_URL = {
  wsPayment:  process.env.REACT_APP_BACKEND_WEBSOCKET_ORDER || "https://msa-joyasperu-order-1094025365695.us-east1.run.app",
  auth: process.env.REACT_APP_BACKEND_AUTH || "https://msa-joyasperu-auth-1094025365695.us-east1.run.app/auth",
  shop: process.env.REACT_APP_BACKEND_SHOP || "https://msa-joyasperu-shop-1094025365695.us-east1.run.app/shop",
  payment: process.env.REACT_APP_BACKEND_ORDER || "https://msa-joyasperu-order-1094025365695.us-east1.run.app/order",
  notification: process.env.REACT_APP_BACKEND_NOTIFICATION || "https://msa-joyasperu-notification-1094025365695.us-east1.run.app/notification",
};


export const ENDPOINTS = {
  auth: {
    login: `/login`,
    register: `/register`,
  },

  shop: {
    products: `/products`,
    getProductById: (id) => `/products/${id}`,
    categoryProducts: '/category-products',
    getCategoryProductById: (id) => `/category-products/${id}`,
  },

  payment: {
    create: `/payment`,
    getCartById: (id) => `/cartbuy/${id}`,
    cart: `/cartbuy`,
    getStatus: `/payment/webhook-get-status`
  },
  notification: {
    create: `/send/mail`
  },
  

};

