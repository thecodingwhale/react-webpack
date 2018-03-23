import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';

import {
  DELETE_TASK_REQUEST,
  EDIT_TASK_REQUEST,
  EDIT_TASK_REQUEST_CANCEL,
} from './constants';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTasks() {
    return this.props.tasks.map(({ _id, name, created_date, status, editing }, index) => {
      const content = !editing ? (
        <div>
          <div>Name: <span className="tasks__list__name">{name}</span></div>
          <div>Status: <span className="tasks__list__status">{status[0]}</span></div>
          <div>Created Date: <strong>{created_date}</strong></div>
        </div>
      ) : (
        <div>
          <Form
            {...{
              editing: true,
              params: {
                _id,
                name,
                status: status[0],
                index,
              }
            }}
          />
        </div>
      );
      const actions = !editing ? (
        <div>
          <button
            onClick={(event) => {
              this.props.onEditTask(index);
            }}
          >
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
      ) : (
        <div>
          <button
            type="button"
            onClick={() => this.props.onCancelEditTask(index)}
          >
            Cancel
          </button>
        </div>
      );
      return (
        <div
          key={index}
          className="tasks__list"
        >
          <div>
            {content}
            <div className="tasks__actions">
              {actions}
            </div>
          </div>
        </div>
      );
    });

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
    onEditTask: (index) => dispatch({
      type: EDIT_TASK_REQUEST,
      index,
    }),
    onCancelEditTask: (index) => dispatch({
      type: EDIT_TASK_REQUEST_CANCEL,
      index,
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
