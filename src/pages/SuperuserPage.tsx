import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/SuperuserPage.css';
import { useNavigate } from 'react-router-dom';



const SuperuserPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="superuser-wrapper">
            <Navbar/>

            <div className="superuser-content">
                <h1>🌟 Super Admin Dashboard</h1>
                <p>Welcome, administrator. You have access to all system-level controls.</p>

                <div className="superuser-sections">
                    <div className="superuser-card">
                        <h2>📦 All Orders Overview</h2>
                        <p>Monitor and manage all delivery orders, including status changes and reassignment.</p>
                    </div>

                    <div className="superuser-card">
                        <h2>🚚 Dispatcher Assignment</h2>
                        <p>Assign delivery personnel for each order and manage dispatcher permissions.</p>
                    </div>

                    <div className="superuser-card">
                        <h2>👥 User Management</h2>
                        <p>View and manage all users, their roles, and system access privileges.</p>
                        <button className="btn-solid" onClick={() => navigate('/superuser/users')}>
                            Manage Users
                        </button>
                    </div>

                    <div className="superuser-card">
                        <h2>🛠️ System Settings</h2>
                        <p>Configure system-wide options and perform administrative maintenance tasks.</p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default SuperuserPage;
