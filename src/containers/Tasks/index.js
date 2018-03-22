import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';

import { DELETE_TASK_REQUEST } from './constants';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTasks() {
    return this.props.tasks.map(({ _id, name, created_date, status }, index) => (
      <div
        key={index}
        className="tasks__list"
      >
        <div>Name: <strong>{name}</strong></div>
        <div>Status: <strong>{status[0]}</strong></div>
        <div>Created Date: <strong>{created_date}</strong></div>
        <div className="tasks__actions">
          <button>
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              event.preventDefault();
              const id = _id;
              this.props.onDeleteTask(id, index);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }

  render
  render() {
    const { fetching, tasks } = this.props;
    let content = null;
    if (fetching) {
      content = <div className="alert">Fetching...</div>;
    }
    content = (tasks === null || tasks.length === 0) ? <div className="alert">No Tasks</div> : (
      <div className="tasks">
        {this.renderTasks()}
      </div>
    );
    return (
      <div className="content">
        <h1>Tasks</h1>
        <Form />
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    tasks: state.tasks,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestTasks: () => dispatch({ type: "API_CALL_REQUEST" }),
    onDeleteTask: (id, index) => dispatch({
      type: DELETE_TASK_REQUEST,
      id,
      index,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
