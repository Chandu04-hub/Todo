import React, { Component } from 'react';
import '../styles/Auth.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: '',
      success: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      this.setState({ success: 'Signup successful! Please login.', error: '' });
      setTimeout(() => this.props.setPage('login'), 1500);
    } catch (err) {
      this.setState({ error: err.message, success: '' });
    }
  };

  render() {
    const { username, email, password, error, success } = this.state;
    return (
      <div className="auth-container">
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <h2>Signup</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} required />
          <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} required />
          <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} required />
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup; 