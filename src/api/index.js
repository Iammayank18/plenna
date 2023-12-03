import api from "./apiServices";
const getAllProducts = () => api.get(`/products`);
const getOneProducts = (id) => api.get(`/products/${id}`);

const Apis = {
  getAllProducts,
  getOneProducts,
};

export default Apis;
