import { BASE_URL } from "./api"; // ✅ Importamos BASE_URL desde api.js

const ENDPOINTS = {
  auth: {
    login: `${BASE_URL}auth/login/`,
    register: `${BASE_URL}auth/register/`,
  },
  shop: {
    products: `${BASE_URL}shop/products/`,
    createProduct: `${BASE_URL}shop/products/create/`,
    getProductById: (id) => `${BASE_URL}shop/products/${id}/`,
  },
  payment: {
    createPaypalPayment: `${BASE_URL}payment/paypal/create/`,
  },
};

export default ENDPOINTS;
