import { watchUnsplash as counter_WatchUnsplash } from 'pages/test1/counter/state/saga';
// import { watchUnsplash as sample_WatchUnsplash } from '../../test1/sample/state/saga';

export const rootSagaTest1 = [
  counter_WatchUnsplash(),
  // sample_WatchUnsplash(),
]
/*
rootSagaTest1 = [
  {
    yield all([
      takeLatest(actions.fetchInitialInfo, fetchInitialInfo),
      takeLatest(actions.getList, getList),
    ]);
  },
]
*/