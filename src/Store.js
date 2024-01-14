import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer,newReviewReducer,newProductReducer,productsReducer,productReviewsReducer,reviewReducer } from './reducers/productReducer';
import { profileReducer, userReducer, forgotPasswordReducer,allUsersReducer,userDetailsReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/CartReducer';
import { newOrderReducer,myOrderReducer,orderDetailsReducer,allOrdersReducer,orderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrderReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer,
  newProduct:newProductReducer,
  product:productReducer,
  allOrders:allOrdersReducer,
  order:orderReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
  productReviews:productReviewsReducer,
  review:reviewReducer,
});




const store = configureStore({
  reducer,
  devTools: composeWithDevTools(),
});

export default store;
