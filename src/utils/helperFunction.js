export const activateItemByKeyForMultiple = (array, id) => {
  return array.map((item) => ({
    ...item,
    isFav: item.id === id ? !item.isFav : item.isFav,
  }));
};

export const activateItemByKeyForMultipleCart = (array, id) => {
  return array.map((item) => ({
    ...item,
    isAddedToCart: item.id === id ? !item.isAddedToCart : item.isAddedToCart,
    quantity: 1,
  }));
};

export const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};
