import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

const API = {
  getAllTasks: () => {
    return axios({
      method: "get",
      url: "http://localhost:3000/tasks"
    });
  },

  addNewTask: (title) => {
    return axios({
      method: "post",
      url: "http://localhost:3000/tasks",
      config: { headers: {'Content-Type': 'application/x-www-form-urlencoded' }},
      data: {
        name: title,
      },
    });
  }
}

function* addNewTask({ title }) {
  try {
    const response = yield call(API.addNewTask, title);
    yield put({ type: "API_CALL_ADD_TASK_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "API_CALL_ADD_TASK_FAILURE", error });
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
}
