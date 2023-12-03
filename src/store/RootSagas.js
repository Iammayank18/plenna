import { takeEvery, all, fork, select } from "redux-saga/effects";
import productSaga from "../redux/saga";
function* watchAndLog() {
  yield takeEvery("*", function* logger(action) {
    const state = yield select();
  });
}

export default function* root() {
  const allForks = [fork(productSaga)];
  if (process.env.NODE_ENV === "development") {
    allForks.unshift(fork(watchAndLog));
  }
  yield all(allForks);
}
