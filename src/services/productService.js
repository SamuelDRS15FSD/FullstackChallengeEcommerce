import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

const normalizeProduct = (product) => {
  if (!product) return null;
  return {
    ...product,
    rate: product.rating?.rate ?? 0,
    count: product.rating?.count ?? 0,
  };
};

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return (response.data || []).map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return normalizeProduct(response.data);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};
