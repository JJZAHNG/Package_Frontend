import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('用户名或密码错误');

      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('username', username);  // ✅ 新增这一行

      // alert('登录成功');
      navigate('/home');
    } catch (err: any) {
      setError(err.message || '登录失败');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">📦 CarryOn</div>
        <h2>Welcome back</h2>
        <p className="subtitle">Enter your credentials to access your account</p>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="you@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <div className="password-row">
            <label>Password</label>
            <span className="link">Forgot password?</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Log in</button>
        </form>

        <p className="footer">
          Don't have an account? <span className="link" onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
