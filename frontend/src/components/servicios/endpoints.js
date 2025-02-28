export const BASE_URL = {
  auth: `https://msa-joyasperu-auth-1094025365695.us-east1.run.app/auth`,
  shop: `https://msa-joyasperu-shop-1094025365695.us-east1.run.app/shop`,
  payment: `http://localhost:4002/order`
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
    create: `/payment`,
  },
};

