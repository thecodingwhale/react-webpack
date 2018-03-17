import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

function fetchTasks() {
  return axios({
    method: "get",
    url: "http://localhost:3000/tasks"
  });
}

export default function* workerSaga() {
  try {
    const response = yield call(fetchTasks);
    const tasks = response.data;
    yield put({ type: "API_CALL_SUCCESS", tasks });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
