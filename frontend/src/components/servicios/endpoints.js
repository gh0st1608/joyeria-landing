// import Contact from "components/pages/Contact";

export const BASE_URL = {
  auth: `https://msa-joyasperu-auth-1094025365695.us-east1.run.app/auth`,
  shop: `https://msa-joyasperu-shop-1094025365695.us-east1.run.app/shop`,
  payment: `https://msa-joyasperu-order-1094025365695.us-east1.run.app/order`,
  notification: "https://msa-joyasperu-notification-1094025365695.us-east1.run.app/notification", // ✅ Corregido

}

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
    createPaypalPayment: `/create`,
  },
  notification: {
    create: `/send/mail`,
  },
  

};

