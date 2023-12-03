import { appTypes } from "./types";
const productReducer = (state = [], action) => {
  switch (action.type) {
    case appTypes.FETCH_ALL_PRODUCTS:
      return { ...state, allProductLoading: true, allProducts: [] };
    case appTypes.SET_ALL_PRODUCTS:
      return {
        ...state,
        allProductLoading: false,
        allProducts: action.payload,
      };

    case appTypes.ADD_TO_CART:
      return {
        ...state,
        cartProducts: [...(state?.cartProducts || []), action?.payload],
      };
    case appTypes.REMOVE_CART:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    case appTypes.UPDATE_CART:
      const { prod, quantity } = action.payload;

      const updatedCartItems = state.cartProducts
        .map((item) => (item.id === prod.id ? { ...item, quantity } : item))
        .filter((item) => item.quantity !== 0);

      const updatedAllProducts = state.allProducts.map((item) =>
        item.id === prod.id
          ? { ...item, isAddedToCart: item.id === prod.id && quantity > 0 }
          : item
      );

      return {
        ...state,
        cartProducts: updatedCartItems,
        allProducts: updatedAllProducts,
      };

    default:
      return state;
  }
};
export default productReducer;
