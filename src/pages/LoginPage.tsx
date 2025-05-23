import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config';


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ 第一步：获取 JWT Token
      const response = await fetch(`${API_BASE}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error('用户名或密码错误');

      const data = await response.json();
      const accessToken = data.access;
      const refreshToken = data.refresh;

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      // ✅ 第二步：调用 /api/users/me/ 获取当前用户信息
      const meRes = await fetch(`${API_BASE}/api/users/me/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!meRes.ok) throw new Error('无法获取用户信息');

      const userInfo = await meRes.json();

      // ✅ 保存到 localStorage，供后续使用
      localStorage.setItem('user_id', userInfo.id);
      localStorage.setItem('username', userInfo.username);
      localStorage.setItem('email', userInfo.email);

      // ✅ 跳转首页
      navigate('/home');
    } catch (err: any) {
      setError(err.message || '登录失败');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">📦 CulverBot</div>
        <h2>Welcome back</h2>
        <p className="subtitle">Enter your credentials to access your account</p>

        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="please enter your username"
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
            placeholder="please enter your password"
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
