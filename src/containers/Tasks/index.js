import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';

import { DELETE_TASK_REQUEST } from './constants';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }

  onDelete() {

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
        <button
          type="button"
          className="tasks__list__button"
          onClick={() => {
            event.preventDefault();
            const id = _id;
            this.props.onDeleteTask(id, index);
          }}
        >
          Delete
        </button>
        <hr />
      </div>
    ));
  }

  render() {
    const { tasks } = this.props;
    if (tasks === null) {
      return (
        <div>No Tasks</div>
      );
    }
    return (
      <div>
        <h1>Tasks</h1>
        <Form />
        <div className="tasks">
          {this.renderTasks()}
        </div>
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
