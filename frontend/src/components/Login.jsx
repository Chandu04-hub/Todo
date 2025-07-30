import React, { Component } from 'react';
import '../styles/Auth.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      this.props.setAuth(data.token, data.user);
      this.props.setPage('dashboard');
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="auth-container">
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          {error && <div className="error">{error}</div>}
          <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} required />
          <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login; 