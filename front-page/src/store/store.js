import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { all } from 'redux-saga/effects';
import { rootSaga } from './rootSaga';
import { rootReducer } from './rootReducer';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
middleware.push(logger);

const createStore = () => {

  let reReducers = combineReducers(rootReducer);

  const store = configureStore({
    reducer : reReducers,
    devTools : true,
    middleware: () => middleware,
  });


  sagaMiddleware.run(rootSaga);

  return store;
}

export default createStore;