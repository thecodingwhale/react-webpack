import React from 'react';
import { connect } from 'react-redux';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.title === '') return false;
    const { title } = this.state;
    this.setState({
      title: '',
    }, () => {
      this.props.onAddTask(title);
    });
  }

  onChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  renderError() {
    if (this.state.title === '') {
      return (
        <div>
          please enter a valid task.
        </div>
      );
    }
    return null;
  };

  render() {
    const { taskSubmitting } = this.props;
    const renderSubmitText = taskSubmitting ? 'Submitting...' : 'Submit';
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset disabled={this.props.taskSubmitting}>
          <p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="title"
              onChange={this.onChange}
              value={this.state.title}
            />
          </p>
          <p>
            <label htmlFor="status">Status:</label>
          </p>
          <button type="submit">{renderSubmitText}</button>
        </fieldset>
        {this.renderError()}
        <hr />
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    taskSubmitting: state.taskSubmitting,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTask: (title) => dispatch({
      type: "API_ADDING_NEW_TASK",
      title,
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
