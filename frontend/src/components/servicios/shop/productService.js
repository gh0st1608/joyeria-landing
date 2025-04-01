import { getRequest, postRequest, putRequest, deleteRequest } from "./api";
import { BASE_URL, ENDPOINTS } from "../endpoints";

/**
 * Servicio para manejar operaciones relacionadas con productos
 */

// Cache simple para productos
const productCache = new Map();

// ✅ Obtener todos los productos
export const getProducts = async () => {
  try {
    const cacheKey = 'all_products';
    // Verificar cache primero
    if (productCache.has(cacheKey)) {
      return productCache.get(cacheKey);
    }

    const products = await getRequest(ENDPOINTS.shop.products);
    const result = Array.isArray(products) ? products : [];
    
    // Almacenar en cache
    productCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("❌ [GET] Error fetching products:", error);
    throw new Error('Failed to fetch products'); // Mejor manejo de errores
  }
};

// ✅ Obtener un producto por ID



export const getProductById = async (_id) => {
  try {
    const endpoint = ENDPOINTS.shop.getProductById(_id);
    const fullUrl = `${BASE_URL.shop}${endpoint}`;
    const response = await getRequest(fullUrl);
    
    if (!response) {
      throw new Error(`Producto con ID ${_id} no encontrado`);
    }
    return response;
  } catch (error) {
    console.error(`❌ Error completo:`, error); // <-- Muestra el error completo
    throw error;
  }
};





// ✅ Crear un producto
export const createProduct = async (productData) => {
  if (!productData) {
    console.error("❌ [POST] No product data provided");
    throw new Error('Product data is required');
  }

  try {
    const newProduct = await postRequest(ENDPOINTS.shop.products, productData);
    
    // Invalidar cache de todos los productos
    productCache.delete('all_products');
    
    return newProduct;
  } catch (error) {
    console.error("❌ [POST] Error creating product:", error);
    throw new Error('Failed to create product');
  }
};

// ✅ Actualizar un producto
export const updateProduct = async (_id, productData) => {
  if (!_id || !productData) {
    console.error("❌ [PUT] Missing ID or product data");
    throw new Error('Product ID and data are required');
  }

  try {
    const updatedProduct = await putRequest(
      ENDPOINTS.shop.getProductById(_id), 
      productData
    );
    
    // Actualizar cache
    productCache.set(_id, updatedProduct);
    productCache.delete('all_products');
    
    return updatedProduct;
  } catch (error) {
    console.error(`❌ [PUT] Error updating product ${_id}:`, error);
    throw new Error(`Failed to update product ${_id}`);
  }
};

// ✅ Eliminar un producto
export const deleteProduct = async (_id) => {
  if (!_id) {
    console.error("❌ [DELETE] No product ID provided");
    throw new Error('Product ID is required');
  }

  try {
    const result = await deleteRequest(ENDPOINTS.shop.getProductById(_id));
    
    // Limpiar cache
    productCache.delete(_id);
    productCache.delete('all_products');
    
    return result;
  } catch (error) {
    console.error(`❌ [DELETE] Error deleting product ${_id}:`, error);
    throw new Error(`Failed to delete product ${_id}`);
  }
};

// ✅ Obtener productos con parámetros de búsqueda
export const getProductsByParams = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const cacheKey = `products_${queryString}`;
    
    // Verificar cache
    if (productCache.has(cacheKey)) {
      return productCache.get(cacheKey);
    }

    const url = `${ENDPOINTS.shop.getProductsByParams}?${queryString}`;
    const products = await getRequest(url);
    const result = Array.isArray(products) ? products : [];
    
    // Almacenar en cache
    productCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("❌ [GET] Error fetching products with params:", error);
    throw new Error('Failed to fetch products with params');
  }
};