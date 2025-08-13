import { all, put, takeLatest } from 'redux-saga/effects';
import { actions } from '.';

function* fetchInitialInfo() {
  yield put(actions.setInitialInfo());
}

export function* watchUnsplash() {
  yield all([
    takeLatest(actions.fetchInitialInfo, fetchInitialInfo),
  ]);
}