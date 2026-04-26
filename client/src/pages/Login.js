import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser(form);
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success(`Welcome back, ${data.name}!`);
      if (data.role === 'student') navigate('/student-dashboard');
      else if (data.role === 'faculty') navigate('/faculty-dashboard');
      else navigate('/admin-dashboard');
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>🎓</div>
        <h2 style={styles.title}>Login to Unimeet</h2>
        <p style={styles.sub}>Enter your credentials to continue</p>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Email Address</label>
          <input
            style={styles.input}
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>
        <p style={styles.footer}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: 'calc(100vh - 60px)', padding: '20px',
    background: 'linear-gradient(160deg, #e8f0fe 0%, #f0f4f8 100%)',
  },
  card: {
    background: '#fff', padding: '44px 40px', borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)', width: '100%', maxWidth: '420px',
  },
  iconWrap: { fontSize: '36px', textAlign: 'center', marginBottom: '10px' },
  title: { textAlign: 'center', fontSize: '24px', fontWeight: '800', color: '#111', marginBottom: '6px' },
  sub:   { textAlign: 'center', color: '#888', fontSize: '14px', marginBottom: '28px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
  input: {
    width: '100%', padding: '12px 14px', marginBottom: '18px',
    border: '1.5px solid #ddd', borderRadius: '9px', fontSize: '15px',
    display: 'block', outline: 'none', transition: 'border 0.2s',
  },
  btn: {
    width: '100%', padding: '13px', background: '#1a73e8', color: '#fff',
    border: 'none', borderRadius: '9px', fontSize: '16px', fontWeight: '700',
    cursor: 'pointer', marginTop: '4px',
  },
  footer: { textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' },
  link:   { color: '#1a73e8', fontWeight: '600' },
};

export default Login;
