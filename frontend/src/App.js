import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Store from "./pages/store/Store";
import ProductDetails from "./pages/store/ProductDetails";
import Cart from "./pages/store/cart/Cart";
import Shipping from "./pages/store/cart/Shipping";
import ConfirmOrder from "./pages/store/cart/ConfirmOrder";
import Payment from "./pages/store/cart/Payment";

import Profile from "./pages/profile/Profile";
import UpdateProfile from "./pages/profile/UpdateProfile";
import UpdatePassword from "./pages/profile/UpdatePassword";
import ForgotPassword from "./pages/profile/ForgotPassword";
import NewProduct from "./pages/profile/NewProduct";
import ResetPassword from "./pages/profile/ResetPassword";

import Invoice from "./pages/orders/Invoice";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";

import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import OrderList from "./pages/admin/OrderList";
import UpdateOrder from "./pages/admin/UpdateOrder";
import Users from "./pages/admin/Users";
import UpdateUser from "./pages/admin/UpdateUser";
import Reviews from "./pages/admin/Reviews";

import "./App.css";


function App(){
  const theme = useSelector((state) => state.theme);
  
  useEffect(() =>{
    const body = document.getElementsByTagName("body");
    body[0].style.backgroundColor = theme ? "white" : "black";
  });

  return(
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<Store/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/password/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/password/reset/:token" element={<ResetPassword/>}/>

          <Route path="/profile/my_profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>}/>

          <Route path="/profile/update_profile" element={
          <ProtectedRoute>
            <UpdateProfile/>
          </ProtectedRoute>}/>

          <Route path="/profile/orders" element={
          <ProtectedRoute>
            <Orders/>
          </ProtectedRoute>}/>

          <Route path="/invoice/order/:id" element={
          <ProtectedRoute>
            <Invoice/>
          </ProtectedRoute>}/>

          <Route path="/profile/orders/:id" element={
          <ProtectedRoute>
            <OrderDetails/>
          </ProtectedRoute>}/>

          <Route path="/profile/update_password" element={
          <ProtectedRoute>
            <UpdatePassword/>
          </ProtectedRoute>}/>

          <Route path={"/profile/new_product"} element={
          <ProtectedRoute>
            <NewProduct/>
          </ProtectedRoute>}/>

          <Route path="/cart" element={
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>}/>

          <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping/>
          </ProtectedRoute>}/>

          <Route path="/order/confirm" element={
          <ProtectedRoute>
            <ConfirmOrder/>
          </ProtectedRoute>}/>

          <Route path="/payment_method" element={
          <ProtectedRoute>
            <Payment/>
          </ProtectedRoute>}/>
          
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/search" element={<Store/>}/>

          <Route path="/admin/dashboard" element={
          <ProtectedRoute admin={true}>
            <Dashboard/>
          </ProtectedRoute>}/>

          <Route path="/admin/products" element={
          <ProtectedRoute admin={true}>
            <Products/>
          </ProtectedRoute>}/>

          <Route path="/admin/product/:id/edit" element={
          <ProtectedRoute admin={true}>
            <UpdateProduct/>
          </ProtectedRoute>}/>

          <Route path="/admin/orders" element={
          <ProtectedRoute admin={true}>
            <OrderList/>
          </ProtectedRoute>}/>

          <Route path="/admin/order/:id/edit" element={
          <ProtectedRoute admin={true}>
            <UpdateOrder/>
          </ProtectedRoute>}/>

          <Route path="/admin/users" element={
          <ProtectedRoute admin={true}>
            <Users/>
          </ProtectedRoute>}/>

          <Route path="/admin/user/:id/edit" element={
          <ProtectedRoute admin={true}>
            <UpdateUser/>
          </ProtectedRoute>}/>

          <Route path="/admin/reviews" element={
          <ProtectedRoute admin={true}>
            <Reviews/>
          </ProtectedRoute>}/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Toaster richColors closeButton position="top-right"/>
      <Footer/>
    </>
  );
}

export default App;