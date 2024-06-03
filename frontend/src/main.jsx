import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

import { Provider } from "react-redux";
import store from "./redux/store";
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import UpdateProduct from './pages/Admin/UpdateProduct.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import Home from './pages/Home.jsx'
import Favourites from './pages/Products/Favourites.jsx'
import ProductInfo from './pages/Products/ProductInfo.jsx'
import CartPage from './pages/CartPage.jsx'
import OrderConfirmation from './pages/Orders/OrderConfirmation.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App></App>}>

      <Route path='/' element={<PrivateRoute></PrivateRoute>}>
        <Route path='/profile' element={<Profile></Profile>}></Route>
      </Route>

      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route index={true} path='/' element={<Home></Home>}></Route>
      <Route path='/favorite' element={<Favourites></Favourites>}></Route>
      <Route path="/product/:id" element={<ProductInfo></ProductInfo>}></Route>
      <Route path="/cart" element={<CartPage></CartPage>}></Route>
      <Route path="/shipping" element={<OrderConfirmation></OrderConfirmation>}></Route>

      <Route path='/admin' element={<AdminRoute></AdminRoute>}>
        <Route path='productlist' element={<ProductList></ProductList>}></Route>
        <Route path='productupdate/:_id' element={<UpdateProduct></UpdateProduct>}></Route>
        <Route path='allproducts' element={<AllProducts></AllProducts>}></Route>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);