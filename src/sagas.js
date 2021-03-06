import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import {
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,

  EDIT_TASK_REQUEST,
  EDIT_TASK_API_REQUEST,
  EDIT_TASK_API_REQUEST_SUCCESS,
  EDIT_TASK_API_REQUEST_FAILURE,
} from './containers/Tasks/constants';

const API = {
  getAllTasks: () => {
    return axios({
      method: "get",
      url: "http://localhost:3000/tasks"
    });
  },

  addNewTask: (title, status) => {
    return axios({
      method: "post",
      url: "http://localhost:3000/tasks",
      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }},
      data: {
        name: title,
        status,
      },
    });
  },

  deleteTask: (id) => {
    return axios({
      method: "delete",
      url: `http://localhost:3000/tasks/${id}`,
      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }},
    });
  },

  updateTask: ({ id, title, status }) => {
    return axios({
      method: "put",
      url: `http://localhost:3000/tasks/${id}`,
      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }},
      data: {
        name: title,
        status,
      },
    });
  }
}

function* addNewTask({ title, status }) {
  try {
    const response = yield call(API.addNewTask, title, status);
    yield put({ type: "API_CALL_ADD_TASK_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "API_CALL_ADD_TASK_FAILURE", error });
  }
}

function* deleteTask({ id, index }) {
  try {
    const response = yield call(API.deleteTask, id);
    yield put({
      type: DELETE_TASK_SUCCESS,
      index,
    });
  } catch (error) {
    yield put({
      type: DELETE_TASK_FAILURE,
      error,
    });
  }
}

function* editTask({ params }) {
  try {
    const response = yield call(API.updateTask, params);
    yield put({
      type: EDIT_TASK_API_REQUEST_SUCCESS,
      payload: {
        index: params.index,
        data: response.data,
      },
    });
  } catch (error) {
    yield put({
      type: EDIT_TASK_API_REQUEST_FAILURE,
      error,
    });
  }
}

export default function* workerSaga() {
  try {
    const response = yield call(API.getAllTasks);
    const tasks = response.data;
    yield put({ type: "API_CALL_SUCCESS", tasks });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE", error });
  }
  yield takeLatest('API_ADDING_NEW_TASK', addNewTask);
  yield takeLatest(DELETE_TASK_REQUEST, deleteTask);
  yield takeLatest(EDIT_TASK_API_REQUEST, editTask)
}
