import React from 'react';
import { connect } from 'react-redux';

class Tasks extends React.Component {
  render() {
    console.log(this.props.tasks);
    return (
      <div>
        Tasks
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
