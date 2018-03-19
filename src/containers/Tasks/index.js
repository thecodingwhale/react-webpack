import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
  }

  renderTasks() {
    return this.props.tasks.map(({ name, created_date, status }, index) => (
      <div key={index}>
        <div>Name: <strong>{name}</strong></div>
        <div>Status: <strong>{status[0]}</strong></div>
        <div>Created Date: <strong>{created_date}</strong></div>
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
        {this.renderTasks()}
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
    onRequestTasks: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
