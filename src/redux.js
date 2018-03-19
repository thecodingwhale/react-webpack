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
    case API_CALL_ADD_TASK_SUCCESS:
      return {
        ...state,
        taskSubmitting: false,
        error: null,
        tasks: [action.payload, ...state.tasks]
      };
    default:
      return state;
  }
}
