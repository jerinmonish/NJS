import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../backoffice/Dashboard";
import AddProducts from "../backoffice/Products/AddProducts";
import Home from "../frontend/components/Home";
import ListProducts from "../backoffice/Products";
import EditProducts from "../backoffice/Products/EditProducts";
import ProductLists from "../frontend/components/ProductLists";
import AllProducts from "../frontend/components/AllProducts.sjx";
import ProductDetail from "../frontend/components/ProductDetail";
import Login from "../frontend/components/Login";
import Registration from "../frontend/components/Registration";
import UserDashboard from "../frontend/components/UserDashboard";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../frontend/components/NotFound";
import CartCheckout from "../frontend/components/CartCheckout";
import CardPayment from "../frontend/components/CardPayment";
import PaymentSuccess from "../frontend/components/PaymentSuccess";
import BuyNowCardPayment from "../frontend/components/BuyNowCardPayment";
// import allMenus from "./RawMenu";

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Routes>
        {allMenus.map((val, idx) => (
          <Route key={idx} path={val?.path} element={val?.component} exact={val?.exact} />
        ))}
      </Routes> */}
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/register'} element={<Registration />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/products'} element={<AllProducts />} />
        <Route path={'/products/:id'} element={<ProductLists />} />
        <Route path={'/product/:id'} element={<ProductDetail />} />
        {/* <Route path={'*'} element={<NotFound />} /> */}
      </Routes>

      {/* <PrivateRoutes exact={true}>
        <Route path={'/user-dashboard'} element={<UserDashboard />} />
      </PrivateRoutes> */}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/cart" element={<CartCheckout />} />
          <Route path="/payment" element={<CardPayment />} />
          <Route path="/buynow-payment" element={<BuyNowCardPayment />} />
          <Route path="/payment-success/:id" element={<PaymentSuccess />} />
        </Route>
      </Routes>

      <Routes>
        <Route element={<AdminRoutes />}>
          <Route path={'/admin/dashboard'} element={<Dashboard />} />
          <Route path={'/admin/products'} element={<ListProducts />} />
          <Route path={'/admin/add-product'} element={<AddProducts />} />
          <Route path={'/admin/edit-product/:id'} element={<EditProducts />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default Router;