import React, { Component } from 'react';
import '../styles/Auth.css';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      error: '',
      success: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = this.state;
    try {
      const res = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.token
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Change password failed');
      this.setState({ success: 'Password changed successfully!', error: '', oldPassword: '', newPassword: '' });
      setTimeout(() => this.props.setPage('dashboard'), 1500);
    } catch (err) {
      this.setState({ error: err.message, success: '' });
    }
  };

  render() {
    const { oldPassword, newPassword, error, success } = this.state;
    return (
      <div className="auth-container">
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <h2>Change Password</h2>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <input type="password" name="oldPassword" placeholder="Old Password" value={oldPassword} onChange={this.handleChange} required />
          <input type="password" name="newPassword" placeholder="New Password" value={newPassword} onChange={this.handleChange} required />
          <button type="submit">Change Password</button>
        </form>
      </div>
    );
  }
}

export default ChangePassword; 