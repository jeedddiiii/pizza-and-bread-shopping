import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Register from "./components/auth/Register";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import CheckoutSuccess from "./components/CheckoutSuccess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import ProductsList from "./components/admin/list/ProductsList";
import Users from "./components/admin/Users";
import Orders from "./components/admin/Orders";
import Product from "./components/Details/Product";
import Order from "./components/Details/Order";
import UserProfile from "./components/Details/UserProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path="create-product" element={<CreateProduct />} />
            </Route>
            <Route path="summary" element={<Summary />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />

          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
