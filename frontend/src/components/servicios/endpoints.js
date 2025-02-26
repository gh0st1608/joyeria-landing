const BASE_URL = "https://msa-joyasperu-shop-1094025365695.us-east1.run.app";

const ENDPOINTS = {
  auth: {
    login: `${BASE_URL}/auth/login/`,
    register: `${BASE_URL}/auth/register/`,
    userList: `${BASE_URL}/auth/user/get-list/`, // 🔹 Obtener lista de usuarios
  },
  shop: {
    products: `${BASE_URL}/shop/products/`,
    createProduct: `${BASE_URL}/shop/products/create/`,
    getProductById: (id) => `${BASE_URL}/shop/products/${id}/`,
  },
  category: {
    create: `${BASE_URL}/shop/category-product/create/`,
    list: `${BASE_URL}/shop/category-product/get-list/`,
  },
  payment: {
    createPaypalPayment: `${BASE_URL}/payment/paypal/create/`,
  },
};

export default ENDPOINTS;
