import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'student',
    department: '', phone_no: '', designation: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      toast.success('Account created! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>📝</div>
        <h2 style={styles.title}>Create Your Account</h2>
        <p style={styles.sub}>Join Unimeet and book appointments easily</p>
        <form onSubmit={handleSubmit}>

          <div style={styles.row}>
            <div style={styles.half}>
              <label style={styles.label}>Full Name *</label>
              <input style={styles.input} type="text" placeholder="Your name" value={form.name} onChange={set('name')} required />
            </div>
            <div style={styles.half}>
              <label style={styles.label}>Role *</label>
              <select style={styles.input} value={form.role} onChange={set('role')}>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
          </div>

          <label style={styles.label}>Email Address *</label>
          <input style={styles.input} type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} required />

          <label style={styles.label}>Password *</label>
          <input style={styles.input} type="password" placeholder="Min. 6 characters" value={form.password} onChange={set('password')} required />

          <div style={styles.row}>
            <div style={styles.half}>
              <label style={styles.label}>Department *</label>
              <input style={styles.input} type="text" placeholder="e.g. CSE, ECE" value={form.department} onChange={set('department')} required />
            </div>
            <div style={styles.half}>
              <label style={styles.label}>Phone Number</label>
              <input style={styles.input} type="text" placeholder="10-digit number" value={form.phone_no} onChange={set('phone_no')} />
            </div>
          </div>

          {form.role === 'faculty' && (
            <>
              <label style={styles.label}>Designation</label>
              <input style={styles.input} type="text" placeholder="e.g. Assistant Professor" value={form.designation} onChange={set('designation')} />
            </>
          )}

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
    minHeight: 'calc(100vh - 60px)', padding: '30px 20px',
    background: 'linear-gradient(160deg, #e8f0fe 0%, #f0f4f8 100%)',
  },
  card: {
    background: '#fff', padding: '44px 40px', borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.10)', width: '100%', maxWidth: '520px',
  },
  iconWrap: { fontSize: '36px', textAlign: 'center', marginBottom: '10px' },
  title: { textAlign: 'center', fontSize: '24px', fontWeight: '800', color: '#111', marginBottom: '6px' },
  sub:   { textAlign: 'center', color: '#888', fontSize: '14px', marginBottom: '28px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#444', marginBottom: '6px' },
  row:   { display: 'flex', gap: '14px' },
  half:  { flex: 1 },
  input: {
    width: '100%', padding: '11px 14px', marginBottom: '16px',
    border: '1.5px solid #ddd', borderRadius: '9px', fontSize: '14px',
    display: 'block', boxSizing: 'border-box',
  },
  btn: {
    width: '100%', padding: '13px', background: '#1a73e8', color: '#fff',
    border: 'none', borderRadius: '9px', fontSize: '16px', fontWeight: '700',
    cursor: 'pointer', marginTop: '4px',
  },
  footer: { textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' },
  link:   { color: '#1a73e8', fontWeight: '600' },
};

export default Register;
