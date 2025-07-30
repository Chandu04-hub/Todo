import React, { Component } from 'react';
import '../styles/TaskItem.css';

class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      title: props.task.title
    };
  }

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleSave = () => {
    this.props.updateTask(this.props.task._id, { title: this.state.title });
    this.setState({ editing: false });
  };

  handleComplete = () => {
    this.props.updateTask(this.props.task._id, { completed: !this.props.task.completed });
  };

  handleDelete = () => {
    this.props.deleteTask(this.props.task._id);
  };

  render() {
    const { task } = this.props;
    const { editing, title } = this.state;
    return (
      <div className={`task-item${task.completed ? ' completed' : ''}`}>
        {editing ? (
          <>
            <input type="text" value={title} onChange={this.handleChange} />
            <button onClick={this.handleSave}>Save</button>
          </>
        ) : (
          <>
            <span className="task-title" onClick={this.handleEdit}>{task.title}</span>
            <button onClick={this.handleComplete}>{task.completed ? 'Undo' : 'Complete'}</button>
            <button onClick={this.handleDelete}>Delete</button>
          </>
        )}
      </div>
    );
  }
}

export default TaskItem; 