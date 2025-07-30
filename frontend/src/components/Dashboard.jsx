import React, { Component } from 'react';
import TaskList from './TaskList.jsx';
import AddTask from './AddTask.jsx';
import UserDetails from './UserDetails.jsx';
import '../styles/Dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      user: null,
      loading: true,
      error: ''
    };
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchTasks();
  }

  fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/me', {
        headers: { 'Authorization': 'Bearer ' + this.props.token }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
      this.setState({ user: data });
      this.props.setAuth(this.props.token, data);
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: { 'Authorization': 'Bearer ' + this.props.token }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch tasks');
      this.setState({ tasks: data, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  };

  addTask = async (title) => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.token
        },
        body: JSON.stringify({ title })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add task');
      this.setState({ tasks: [data, ...this.state.tasks] });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  updateTask = async (id, updates) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.token
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update task');
      this.setState({ tasks: this.state.tasks.map(t => t._id === id ? data : t) });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + this.props.token }
      });
      if (!res.ok) throw new Error('Failed to delete task');
      this.setState({ tasks: this.state.tasks.filter(t => t._id !== id) });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { tasks, user, loading, error } = this.state;
    return (
      <div className="dashboard-container">
        <UserDetails user={user} />
        <AddTask addTask={this.addTask} />
        {error && <div className="error">{error}</div>}
        {loading ? <div>Loading...</div> : <TaskList tasks={tasks} updateTask={this.updateTask} deleteTask={this.deleteTask} />}
      </div>
    );
  }
}

export default Dashboard; 