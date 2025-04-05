export const BASE_URL = {
  wsPayment: process.env.REACT_APP_BACKEND_WEBSOCKET_ORDER || "https://msa-joyasperu-order-1094025365695.us-east1.run.app",
  auth: process.env.REACT_APP_BACKEND_AUTH || "https://us-central1-oval-crawler-444615-k3.cloudfunctions.net/authService",
  shop: process.env.REACT_APP_BACKEND_SHOP || "https://us-central1-oval-crawler-444615-k3.cloudfunctions.net/shopService",
  payment: process.env.REACT_APP_BACKEND_ORDER || "https://msa-joyasperu-order-1094025365695.us-east1.run.app/order",

  notification: process.env.REACT_APP_BACKEND_NOTIFICATION || "https://us-central1-oval-crawler-444615-k3.cloudfunctions.net/notificationService/notification",
};

export const ENDPOINTS = {
  auth: {
    login: `/login`,
    register: `/register`,
    user: `/user`,   // ✅ endpoint corregido en singular
    getUserById: (_id) => `/user/${_id}`,
  },

  
  shop: {
    products: `/products`, // GET /products
    getProductById: (_id) => `/products/${_id}`,
    getProductsByParams: `/products/filters`,    // GET /products/filters?query
    categoryProducts: `/category-products`,
    getCategoryProductById: (_id) => `/category-products/${_id}`,
  },

  payment: {
    create: `/payment`,
    getCartById: (_id) => `/cartbuy/${_id}`,
    cart: `/cartbuy`,
    getStatus: `/payment/webhook-get-status`,
    listPays: `/payment/list`,
    deletePay: (_id) => `/payment/${_id}`
  },

  notification: {
    create: `/send/mail`
  },

  dashboard: {
    user: "/users",
    createUser: "/users",
    updateUser: (_id) => `/users/${_id}`,
    deleteUser: (_id) => `/users/${_id}`,
}

};
