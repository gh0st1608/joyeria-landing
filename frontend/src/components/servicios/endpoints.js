
export const BASE_URL = {
  auth: `https://msa-joyasperu-auth-1094025365695.us-east1.run.app/auth`,
  shop: `https://msa-joyasperu-shop-1094025365695.us-east1.run.app/shop`,
  payment: `https://msa-joyasperu-order-1094025365695.us-east1.run.app/order`,
  contact: `https://msa-joyasperu-Contact-1094025365695.us-east1.run.app/contact`,

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
  contact: {
    createContact: `/create`,
  },

};

