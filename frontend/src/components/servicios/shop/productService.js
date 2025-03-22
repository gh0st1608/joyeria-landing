import { getRequest, postRequest, putRequest, deleteRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// ✅ Obtener todos los productos
export const getProducts = async () => {
  try {
    console.log(`📡 Fetching products from: ${ENDPOINTS.shop.products}`);
    const products = await getRequest(ENDPOINTS.shop.products);
    return products || [];
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
};

// ✅ Obtener un producto por ID
export const getProductById = async (_id) => {
  try {
    console.log(`📡 Fetching product ID: ${_id}`);
    return await getRequest(ENDPOINTS.shop.getProductById(_id));
  } catch (error) {
    console.error(`❌ Error fetching product ${_id}:`, error);
    return null;
  }
};

// ✅ Crear un producto
export const createProduct = async (productData) => {
  try {
    console.log(`📡 Creating product`, productData);
    return await postRequest(ENDPOINTS.shop.products, productData);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    return null;
  }
};

// ✅ Actualizar un producto
export const updateProduct = async (_id, productData) => {
  try {
    console.log(`📡 Updating product ID: ${_id}`, productData);
    return await putRequest(ENDPOINTS.shop.getProductById(_id), productData);
  } catch (error) {
    console.error(`❌ Error updating product ${_id}:`, error);
    return null;
  }
};

// ✅ Eliminar un producto
export const deleteProduct = async (_id) => {
  try {
    console.log(`📡 Deleting product ID: ${_id}`);
    return await deleteRequest(ENDPOINTS.shop.getProductById(_id));
  } catch (error) {
    console.error(`❌ Error deleting product ${_id}:`, error);
    return false;
  }
};

// ✅ Obtener productos con parámetros de búsqueda
export const getProductsByParams = async (params) => {
  try {
    console.log(`📡 Fetching products with params:`, params);
    const queryString = new URLSearchParams(params).toString();
    return await getRequest(`${ENDPOINTS.shop.products}?${queryString}`);
  } catch (error) {
    console.error("❌ Error fetching products with params:", error);
    return [];
  }
};
