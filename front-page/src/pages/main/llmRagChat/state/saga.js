import { all, put, call, takeLatest } from 'redux-saga/effects';
import { actions } from '.';
import callApi from 'lib/callApi';

function* fetchInitialInfo() {
  yield put(actions.setInitialInfo());
}

function* sendMessage({ payload }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/llmRagChat',
    method: 'POST',
    data: { message: payload }
  });
  if (isSuccess && data) {
    yield put(actions.receiveMessage(data.message));
  }
}
export function* watchUnsplash() {
  yield all([
    takeLatest(actions.fetchInitialInfo, fetchInitialInfo),
    takeLatest(actions.sendMessage, sendMessage),
  ]);
}