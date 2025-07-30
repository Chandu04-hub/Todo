import React, { Component } from 'react';
import TaskItem from './TaskItem.jsx';
import '../styles/TaskList.css';

class TaskList extends Component {
  render() {
    const { tasks, updateTask, deleteTask } = this.props;
    return (
      <div className="task-list">
        {tasks.length === 0 ? (
          <div className="no-tasks">No tasks yet.</div>
        ) : (
          tasks.map(task => (
            <TaskItem key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
          ))
        )}
      </div>
    );
  }
}

export default TaskList; 