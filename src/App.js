import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import ProductDetail from "./Pages/ProductDetail";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer";
import cakeBanner from "./Components/Assets/bannerimage.jpg";
import Products from "./Pages/Admin/Products";
import Categories from "./Pages/Admin/Categories";
import Users from "./Pages/Admin/Users";
import { UserContext } from "./Components/UserContext";
import { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Fixed import name for jwtDecode
import ProtectedRoute from "./Components/ProtectedRoute";
import CustomizedCakes from "./Components/CustomizedCakes";
import ProductsByCategory from "./Pages/ProductsByCategory";
import CustomCakes from "./Pages/Admin/CustomCakes";
import Checkout from "./Pages/Checkout";
import PaymentPage from "./Pages/PaymentPage";
import SuccessPage from "./Pages/SuccessPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_test_51QRfhALB7kIWN36jDFkMqehFIdNb54kcRxfKRss77VPjr9BL6r9oEanOJxpUDndGG5dTMidIR9UohCSWVPK9212V00lJGW3Vil"
);

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser.user);
    }
  }, [setUser]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Cakes"
              element={<Product banner={cakeBanner} category="Cakes" />}
            />
            <Route
              path="/Cakes/:categoryId"
              element={<ProductsByCategory banner={cakeBanner} />}
            />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/productDetail" element={<ProductDetail />}>
              <Route path=":productId" element={<ProductDetail />} />
            </Route>
            <Route path="/Login" element={<Login />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/customized-cakes" element={<CustomizedCakes />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route
              path="/Products"
              element={<ProtectedRoute role="Admin" component={Products} />}
            />
            <Route
              path="/Categories"
              element={<ProtectedRoute role="Admin" component={Categories} />}
            />
            <Route
              path="/Users"
              element={<ProtectedRoute role="Admin" component={Users} />}
            />
            <Route
              path="/custom-cakes"
              element={<ProtectedRoute role="Admin" component={CustomCakes} />}
            />
          </Routes>
        </Elements>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
