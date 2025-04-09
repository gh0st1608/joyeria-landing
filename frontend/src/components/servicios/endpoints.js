// Base URLs por microservicio
export const BASE_URL = {
  wsPayment: process.env.REACT_APP_BACKEND_WEBSOCKET_ORDER ||
    "https://msa-joyasperu-order-1094025365695.us-east1.run.app",

  auth: process.env.REACT_APP_BACKEND_AUTH ||
    "https://us-central1-oval-crawler-444615-k3.cloudfunctions.net/authService",

  shop: process.env.REACT_APP_BACKEND_SHOP ||
    "https://us-central1-oval-crawler-444615-k3.cloudfunctions.net/shopService",

  payment: process.env.REACT_APP_BACKEND_ORDER ||
    "https://msa-joyasperu-order-1094025365695.us-east1.run.app/order",

  notification: process.env.REACT_APP_BACKEND_NOTIFICATION ||
    "https://us-central1-oval-crawler-444615-k3.cloudfunctions.net/notificationService/notification",
};

// Endpoints agrupados por módulo
export const ENDPOINTS = {
  auth: {
    login: `/login`,
    register: `/register`,
    user: `/user`,
    getUserById: (_id) => `/user/${_id}`,
  },

  shop: {
    products: `/products`,                            // GET /products
    getProductById: (_id) => `/products/${_id}`,      // GET /products/:id
    getProductsByParams: `/products/filters`,         // GET /products/filters?query
    categoryProducts: `/category-products`,           // GET /category-products
    getCategoryProductById: (_id) => `/category-products/${_id}`,
  },

  payment: {
    create: `/payment`,                               // POST /payment
    cart: `/cartbuy`,                                 // GET /cartbuy
    getCartById: (_id) => `/cartbuy/${_id}`,          // GET /cartbuy/:id
    getStatus: `/payment/webhook-get-status`,         // GET /payment/webhook-get-status
    listPays: `/payment/list`,                        // GET /payment/list
    deletePay: (_id) => `/payment/${_id}`,            // DELETE /payment/:id
  },

  notification: {
    create: `/send/mail`,                             // POST /send/mail
  },

  dashboard: {
    user: `/users`,                                   // GET /users
    createUser: `/users`,                             // POST /users
    updateUser: (_id) => `/users/${_id}`,             // PUT /users/:id
    deleteUser: (_id) => `/users/${_id}`,             // DELETE /users/:id
  }
};
