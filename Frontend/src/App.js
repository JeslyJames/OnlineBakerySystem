import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs'; // Import AboutUs
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import Signin from './Pages/Signin';
import Cart from './Pages/Cart';
import Footer from './Components/Item/Footer';
import AdminDashboard from './Pages/AdminDashboard'; // Admin Dashboard
import Dashboard from './Pages/Dashboard'; // Customer dashboard
import AdminRoute from './Components/AdminRoute'; // Admin Route protection
import Cakes from './Pages/Cakes'; // Cakes page
import Cheesecakes from './Pages/Cheesecakes'; // Cheesecakes page
import Cupcakes from './Pages/Cupcakes'; // Cupcakes page
import ProductDetail from './Pages/ProductDetail'; // Import Product Detail page

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar /> {/* Navigation bar */}
        <Routes>
          <Route path='/' element={<Home />} /> {/* Home route */}
          <Route path='/Cakes' element={<Cakes />} /> {/* Cakes page route */}
          <Route path='/Cheesecakes' element={<Cheesecakes />} /> {/* Cheesecakes page route */}
          <Route path='/Cupcakes' element={<Cupcakes />} /> {/* Cupcakes page route */}
          <Route path='/AboutUs' element={<AboutUs />} /> {/* About Us page route */}
          <Route path='/ContactUs' element={<ContactUs />} /> {/* Contact Us page route */}
          <Route path='/Login' element={<Login />} /> {/* Login page */}
          <Route path='/Signin' element={<Signin />} /> {/* Signup/Signin page */}
          <Route path='/Cart' element={<Cart />} /> {/* Shopping Cart page */}
          <Route path='/dashboard' element={<Dashboard />} /> {/* Customer dashboard route */}
          <Route path='/admin-dashboard' element={<AdminRoute><AdminDashboard /></AdminRoute>} /> {/* Admin dashboard protected route */}
          <Route path='/product/:id' element={<ProductDetail />} /> {/* Product Detail page route */}
        </Routes>
        <Footer /> {/* Footer */}
      </BrowserRouter>
    </div>
  );
}

export default App;
