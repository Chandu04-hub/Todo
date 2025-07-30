import React, { Component } from 'react';
import '../styles/Navbar.css';

class Navbar extends Component {
  handleNav = (page) => {
    this.props.setPage(page);
  };

  render() {
    const { token, page, onLogout } = this.props;
    return (
      <nav className="navbar">
        <div className="navbar-logo">MERN TODO</div>
        <div className="navbar-links">
          {!token && (
            <>
              <button className={page === 'login' ? 'active' : ''} onClick={() => this.handleNav('login')}>Login</button>
              <button className={page === 'signup' ? 'active' : ''} onClick={() => this.handleNav('signup')}>Signup</button>
            </>
          )}
          {token && (
            <>
              <button className={page === 'dashboard' ? 'active' : ''} onClick={() => this.handleNav('dashboard')}>Dashboard</button>
              <button className={page === 'change-password' ? 'active' : ''} onClick={() => this.handleNav('change-password')}>Change Password</button>
              <button onClick={onLogout}>Logout</button>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar; 