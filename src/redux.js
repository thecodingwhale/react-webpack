import update from 'immutability-helper';

import {
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,

  EDIT_TASK_REQUEST,
  EDIT_TASK_REQUEST_CANCEL,
  EDIT_TASK_API_REQUEST_SUCCESS,
} from './containers/Tasks/constants';

// action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";
const API_ADDING_NEW_TASK = "API_ADDING_NEW_TASK";
const API_CALL_ADD_TASK_SUCCESS = "API_CALL_ADD_TASK_SUCCESS";
const API_CALL_ADD_TASK_FAILURE = "API_CALL_ADD_TASK_FAILURE";


// reducer with initial state
const initialState = {
  fetching: false,
  tasks: null,
  error: null,
  taskSubmitting: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
      break;
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, tasks: action.tasks };
      break;
    case API_CALL_FAILURE:
      return { ...state, fetching: false, tasks: null, error: action.error };
      break;
    case API_ADDING_NEW_TASK:
      return { ...state, taskSubmitting: true, error: null };
      break;
    case API_CALL_ADD_TASK_SUCCESS:
      return {
        ...state,
        taskSubmitting: false,
        error: null,
        tasks: [action.payload, ...state.tasks]
      };
      break;
    case DELETE_TASK_FAILURE:
      return { ...state, fetching: false, tasks: null, error: action.error };
      break;
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.slice(0, action.index).concat(state.tasks.slice(action.index + 1))
      };
      break;
    case EDIT_TASK_REQUEST:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          ...state.tasks[action.index].editing = true,
        ],
      };
      break;
    case EDIT_TASK_REQUEST_CANCEL:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          ...state.tasks[action.index].editing = false,
        ],
      };
      break;
    case EDIT_TASK_API_REQUEST_SUCCESS:
      const { index, data } = action.payload;
      const { name, status, created_date } = data;
      return update(state, {
        tasks: {
          [index]: {
            editing: {$set: false},
            name: {$set: name},
            status: {$set: status},
            created_date: {$set: created_date},
          }
        }
      });
      break;
    default:
      return state;
  }
}
