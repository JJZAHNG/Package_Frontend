import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OrderPage from "./pages/OrderPage";
import DashboardPage from "./pages/DashboardPage";
import MyOrdersPage from './pages/MyOrdersPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
      </Routes>
    </Router>
  );
}

export default App;
