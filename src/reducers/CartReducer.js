import { ADD_TO_CART,REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
    shippingInfo:localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};



export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item.product === newItem.product);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product === existingItem.product ? newItem : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

      case REMOVE_CART_ITEM:
        return{
            ...state,
            cartItems:state.cartItems.filter((i)=>i.product !== action.payload),
        }

      case SAVE_SHIPPING_INFO :
            return{
                ...state,
                shippinginfo:action.payload
            }

    default:
      return state;
  }
};
