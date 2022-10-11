import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.product === item.product && x.itemType === item.itemType
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product && x.itemType === existItem.itemType
              ? item
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      console.log(action.payload.id, action.payload.itemType);
      state.cartItems.forEach((x) => console.log(x.product, x.itemType));
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) =>
            Number(x.product) !== Number(action.payload.id) ||
            x.itemType !== action.payload.itemType
        ),
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
