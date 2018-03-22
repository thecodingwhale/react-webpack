import React from 'react';
import { connect } from 'react-redux';

const options = [
  'pending',
  'ongoing',
  'completed',
];

const DEFAULT_STATUS = 'pending';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      status: DEFAULT_STATUS,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.title === '') return false;
    const { title, status } = this.state;
    this.setState({
      title: '',
      status: DEFAULT_STATUS,
    }, () => {
      this.props.onAddTask(title, status);
    });
  }

  onChangeTitle(event) {
    this.setState(Object.assign(this.state, {
      title: event.target.value,
    }));
  }

  onChangeStatus(event) {
    this.setState(Object.assign(this.state, {
      status: event.target.value,
    }));
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

  renderSelect() {
    return (
      <select onChange={this.onChangeStatus}>
        {options.map((option, index) => (<option key={index} value={option}>{option}</option>))}
      </select>
    );
  }

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
              onChange={this.onChangeTitle}
              value={this.state.title}
            />
          </p>
          <p>
            <label htmlFor="status">Status:</label>
            {this.renderSelect()}
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
    onAddTask: (title, status) => dispatch({
      type: "API_ADDING_NEW_TASK",
      title,
      status,
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
