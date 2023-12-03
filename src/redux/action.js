import { appTypes } from "./types";

function fetchAllProducts(data) {
  return {
    type: appTypes.FETCH_ALL_PRODUCTS,
    payload: data,
  };
}
function setAllProducts(data) {
  return {
    type: appTypes.SET_ALL_PRODUCTS,
    payload: data,
  };
}

function addToCart(data) {
  return {
    type: appTypes.ADD_TO_CART,
    payload: data,
  };
}
function removeFromCart(data) {
  return {
    type: appTypes.REMOVE_CART,
    payload: data,
  };
}
function updateCart(data) {
  return {
    type: appTypes.UPDATE_CART,
    payload: data,
  };
}

export const productAction = {
  fetchAllProducts,
  setAllProducts,
  addToCart,
  removeFromCart,
  updateCart,
};
