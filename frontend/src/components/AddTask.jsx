import React, { Component } from 'react';
import '../styles/AddTask.css';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.title.trim()) {
      this.props.addTask(this.state.title);
      this.setState({ title: '' });
    }
  };

  render() {
    return (
      <form className="add-task-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={this.state.title}
          onChange={this.handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddTask; 