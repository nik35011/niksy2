import React, { useState } from 'react';
import './App.css';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import webFont from "webfontloader";
import Footer from './component/layout/Footer/Footer.js';
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import store from './Store.js';
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdatedProfile from "./component/User/UpdatedProfile.js";
import UpdatedPassword from './component/User/UpdatedPassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSucccess from "./component/Cart/OrderSucccess.js";
import MyOrders from "./component/order/MyOrders.js";
import OrderDetails from "./component/order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductLIst from "./component/admin/ProductLIst.js";
import NewProduct from './component/admin/NewProduct.js';
import UpdateProduct from './component/admin/UpdateProduct.js';
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from './component/admin/ProcessOrder.js';
import UsersList from './component/admin/UsersList.js';
import UpdateUser from './component/admin/UpdateUser.js';
import ProductReviews from './component/admin/ProductReviews.js';
import axios from  "axios";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import Contact from './component/layout/Contact/Contact.js';
import About from './component/layout/About/About.js';



function App() {

  const {isAuthenticated,user}=useSelector((state)=>state.user);

  const [stripeApiKey,setStripeApiKey]=useState("");

  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(()=>{
webFont.load({
  google:{
    families:["Roboto","Droid sans","Chilanka"],
  }
});
store.dispatch(loadUser());

getStripeApiKey();
  },[]);

  return (
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Routes>

      <Route exact path='/' Component={Home} />
      <Route exact path="/Search" element={<Search />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
      <Route exact path='/product/:id' Component={ProductDetails} />
      <Route exact path='/products' Component={Products} />
      <Route  path='/products/:keyword' Component={Products} />

      <Route exact path='/search' Component={Search} />
      <Route
        exact
        path='/account'
        element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/me/update'
        element={
            <ProtectedRoute>
                <UpdatedProfile />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/password/update'
        element={
            <ProtectedRoute>
                <UpdatedPassword />
            </ProtectedRoute>
        }
    />

    <Route exact path='/password/forgot' Component={ForgotPassword} />
    <Route exact path='/password/reset/:token' Component={ResetPassword} />



      <Route exact path='/login' Component={LoginSignUp} />
      <Route exact path='/cart' Component={Cart} />
      

      <Route
        exact
        path='/shipping'
        element={
            <ProtectedRoute>
                <Shipping />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/order/confirm'
        element={
            <ProtectedRoute>
                <ConfirmOrder />
            </ProtectedRoute>
        }
    />


<Route
  exact
  path='/process/payment'
  element={stripeApiKey && (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <ProtectedRoute>
        <Payment />
      </ProtectedRoute>
    </Elements>
  )
  }
/>


<Route
        exact
        path='/success'
        element={
            <ProtectedRoute>
                <OrderSucccess />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/orders'
        element={
            <ProtectedRoute>
                <MyOrders />
            </ProtectedRoute>
        }
    />
    
<Route
        exact
        path='/order/:id'
        element={
            <ProtectedRoute>
                <OrderDetails />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/admin/dashboard'
        isAdmin={true}
        element={
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/admin/products'
        isAdmin={true}
        element={
            <ProtectedRoute>
                <ProductLIst />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/admin/product'
        isAdmin={true}
        element={
            <ProtectedRoute>
                <NewProduct />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/admin/product/:id'
        isAdmin={true}
        element={
            <ProtectedRoute>
                <UpdateProduct />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/admin/orders'
        isAdmin={true}
        element={
            <ProtectedRoute>
                <OrderList />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/admin/order/:id'
        isAdmin={true}
        element={
            <ProtectedRoute>
                <ProcessOrder />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/admin/users'
        isAdmin={true}
        element={
            <ProtectedRoute>
                <UsersList />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/admin/user/:id'
        isAdmin={true}
        element={
            <ProtectedRoute>
                <UpdateUser />
            </ProtectedRoute>
        }
    />

<Route
        exact
        path='/admin/reviews'
        isAdmin={true}
        element={
            <ProtectedRoute>
                <ProductReviews />
            </ProtectedRoute>
        }
    />
      
      
      
      </Routes>

      
      
      <Footer/>
    </Router>
  );
}

export default App;
