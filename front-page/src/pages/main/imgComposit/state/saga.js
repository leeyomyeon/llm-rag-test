import { all, put, call, takeLatest } from 'redux-saga/effects';
import { actions } from '.';
import callApi from 'lib/callApi';

function* fetchInitialInfo() {
  yield put(actions.setInitialInfo());
}

function* sendMessage({ payload }) {
  const { isSuccess, data } = yield call(callApi, {
    url: '/llmChat',
    method: 'POST',
    data: { message: payload }
  });
  if (isSuccess && data) {
    yield put(actions.receiveMessage(data.message));
  } else {
    yield put(actions.receiveMessage('에러가 발생했습니다. 관리자에게 문의하세요.'));
  }
}
export function* watchUnsplash() {
  yield all([
    takeLatest(actions.fetchInitialInfo, fetchInitialInfo),
    takeLatest(actions.sendMessage, sendMessage),
  ]);
}