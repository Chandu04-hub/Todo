import React, { Component } from 'react';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';
import ChangePassword from './components/ChangePassword.jsx';
import Navbar from './components/Navbar.jsx';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
      token: localStorage.getItem('token') || '',
      user: null
    };
  }

  setPage = (page) => {
    this.setState({ page });
  };

  setAuth = (token, user) => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
    this.setState({ token, user });
  };

  handleLogout = () => {
    this.setAuth('', null);
    this.setPage('login');
  };

  render() {
    const { page, token, user } = this.state;
    return (
      <div className="App">
        <Navbar
          page={page}
          setPage={this.setPage}
          token={token}
          onLogout={this.handleLogout}
        />
        <div className="main-content">
          {page === 'login' && <Login setPage={this.setPage} setAuth={this.setAuth} />}
          {page === 'signup' && <Signup setPage={this.setPage} />}
          {page === 'dashboard' && token && <Dashboard token={token} user={user} setAuth={this.setAuth} />}
          {page === 'change-password' && token && <ChangePassword token={token} setPage={this.setPage} />}
        </div>
      </div>
    );
  }
}

export default App; 