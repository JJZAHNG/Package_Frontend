// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/DashboardPage.css';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Navbar />

      <div className="dashboard-content">
        <h1 className="fade-in">Welcome, {username}!</h1>
        <p className="fade-in-delayed">Manage your deliveries and track your packages.</p>

        <div className="dashboard-cards">
          {/* 📦 Recent Orders */}
          <div className="dashboard-card slide-up">
            <h2>🕒 Recent Orders</h2>
            <p>You have no recent orders.</p>
            <div className="card-buttons">
              <button className="btn-solid" onClick={() => navigate('/order')}>
                Place Your First Order
              </button>
              <button className="btn-outline" onClick={() => navigate('/orders')}>
                View All Orders
              </button>
            </div>
          </div>

          {/* 👤 Account Info */}
          <div className="dashboard-card slide-up">
            <h2>👤 Account Information</h2>
            <p><strong>Name</strong><br />{username}</p>
            <p><strong>Email</strong><br />{username}@gmail.com</p>
            <button className="btn-outline">Edit Profile</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardPage;
