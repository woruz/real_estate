import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Listings from './components/listings/Listings';
import ListingDetails from './components/listings/ListingDetails';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Favourites from './components/listings/Favourites';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (you can implement your own logic here)
    const userLoggedIn = localStorage.getItem('loggedIn');
    console.log({userLoggedIn})
    if (userLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <ToastContainer />
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path="/listings" element={isLoggedIn ? <Listings /> : <Navigate to="/login" />} />
            <Route path="/listings/:id" element={isLoggedIn ? <ListingDetails /> : <Navigate to="/login" />} />
            <Route path="/favorites" element={isLoggedIn ? <Favourites /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
