import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { rootSaga } from './rootSaga';
import { rootReducer } from './rootReducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
middleware.push(logger);

const createStore = () => {
  const store = configureStore({
    reducer : rootReducer,
    devTools : true,
    middleware: () => middleware,
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

export default createStore;