import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/DispatcherPage.css';

interface Order {
    id: number;
    pickup_building: string;
    delivery_building: string;
    status: string;
    created_at: string;
    student: {
        username: string;
        is_student: boolean;
        is_teacher: boolean;
    };
}

const DispatcherPage: React.FC = () => {
    const [authorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchUserAndOrders = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('http://127.0.0.1:8000/api/users/me/', {
                    headers: {Authorization: `Bearer ${token}`},
                });

                if (!res.ok) return setAuthorized(false);

                const user = await res.json();
                if (user.is_dispatcher) {
                    setAuthorized(true);
                    fetchOrders(token);
                } else {
                    setAuthorized(false);
                }
            } catch (err) {
                console.error('用户验证失败:', err);
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        const fetchOrders = async (token: string) => {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/dispatch/orders/', {
                    headers: {Authorization: `Bearer ${token}`},
                });
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error('订单获取失败:', err);
            }
        };

        fetchUserAndOrders();
    }, []);

    const updateStatus = async (orderId: number, newStatus: string) => {
        const token = localStorage.getItem('access_token');
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/dispatch/orders/${orderId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({status: newStatus}),
            });

            if (res.ok) {
                const updated = await res.json();
                setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
            } else {
                alert('❌ 更新失败');
            }
        } catch (err) {
            console.error('状态更新异常:', err);
        }
    };

    const formatRole = (order: Order) => {
        if (order.student?.is_teacher) return 'Teacher';
        if (order.student?.is_student) return 'Student';
        return 'User';
    };

    const formatTime = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleString(); // 可根据需要改成 date.toLocaleDateString()
    };

    if (loading) return <div className="loading">⏳ 正在加载页面...</div>;
    if (!authorized) return <div className="forbidden">⛔ 您没有权限访问此页面</div>;

    return (
        <div className="dispatcher-wrapper">
            <Navbar/>
            <div className="dispatcher-container">
                <div className="dispatcher-header">
                    <h1>🚚 Dispatcher Control Panel</h1>
                    <p>You can monitor and manage the delivery status of all active orders.</p>
                </div>

                <div className="order-table-wrapper">
                    <table className="order-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pickup</th>
                            <th>Delivery</th>
                            <th>Status</th>
                            <th>Change</th>
                            <th>Ordered By</th>
                            <th>Role</th>
                            <th>Order Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>#{String(order.id).padStart(5, '0')}</td>
                                <td>{order.pickup_building}</td>
                                <td>{order.delivery_building}</td>
                                <td>
                    <span className={`status-pill ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                                </td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                    >
                                        <option value="NONE">Unselected</option>
                                        <option value="ASSIGNED">Assigned</option>
                                        <option value="DELIVERING">Delivering</option>
                                        <option value="DELIVERED">Delivered</option>
                                    </select>
                                </td>
                                <td>{order.student?.username || '—'}</td>
                                <td>{formatRole(order)}</td>
                                <td>{formatTime(order.created_at)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default DispatcherPage;
