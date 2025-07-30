import React, { Component } from 'react';
import '../styles/UserDetails.css';

class UserDetails extends Component {
  render() {
    const { user } = this.props;
    if (!user) return null;
    return (
      <div className="user-details">
        <h3>User Details</h3>
        <div><strong>Username:</strong> {user.username}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
      </div>
    );
  }
}

export default UserDetails; 