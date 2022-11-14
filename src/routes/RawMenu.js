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
var allMenus = [
  {
    path: "/register",
    name: "Registration",
    component: <Registration />,
  },
  {
    path: "/login",
    name: "Login",
    component: <Login />,
  },
  {
    path: "/user-dashboard",
    name: "User Dashboard",
    component: <UserDashboard />,
  },
  {
    path: "/",
    name: "Home",
    component: <Home />,
  },
  {
    path: "/products",
    name: "All Products",
    component: <AllProducts />,
  },
  {
    path: "/products/:id",
    name: "Products",
    component: <ProductLists />,
  },
  {
    path: "/product/:id",
    name: "Product Details",
    component: <ProductDetail />,
  },
  {
    path: "/admin/dashboard",
    name: "Admin Dashboard",
    component: <Dashboard />,
  },
  {
    path: "/admin/products",
    name: "Admin List Product",
    component: <ListProducts />,
  },
  {
    path: "/admin/add-product",
    name: "Admin Dashboard",
    component: <AddProducts />,
  },
  {
    path: "/admin/edit-product/:id",
    name: "Edit Product",
    component: <EditProducts />,
  },
]

export default allMenus