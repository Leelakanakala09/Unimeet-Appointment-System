import React from 'react';

const Footer = () => (
  <footer style={styles.footer}>
    <p>© 2026 Unimeet – Faculty Appointment Management System. Built with MERN Stack.</p>
  </footer>
);

const styles = {
  footer: {
    textAlign: 'center', padding: '20px',
    background: '#1a73e8', color: '#fff',
    marginTop: '40px', fontSize: '14px'
  }
};

export default Footer;
