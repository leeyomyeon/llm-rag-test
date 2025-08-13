import { rootSagaMain } from 'pages/main/state/rootSaga';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    ...rootSagaMain,
  ])
}

export default rootSaga;