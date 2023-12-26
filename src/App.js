import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Component/Header";
import Navbar from "./Component/Navbar";
import NavbarMob from "./Component/NavbarMob";
import Home from "./Component/Home";
import ProductPage from "./Component/ProductPage";
import DetailsCart from "./Component/DetailsCart";
import ProductCartCompo from "./Component/ProductCartCompo";
import Status from "./PaymentGateway/Status";
import UserForm from "./Auth/UserForm";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Footer from "./Component/Footer";
function App() {
  return (
    <>
      <Header />
      <Navbar />
      <NavbarMob/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products/:category" element={<ProductPage />} />
        <Route path="/product/:title" element={<DetailsCart />} />
        <Route path="/cart" element={<ProductCartCompo />} />
        <Route path="/success" element={<Status />} />
        <Route path="/user" element={<UserForm />}>
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
          <Route />
        </Route>
      </Routes>
      <Footer/>
    </>
  );
}
export default App;
