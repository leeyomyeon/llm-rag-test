import { createSlice, createAction } from '@reduxjs/toolkit';

const ROOT_SLICE_NAME = 'test1';
const SLICE_NAME = 'counter';

const initialState = {
  onload: false,
  number: 0,
}

const sagaAction = {
  fetchInitialInfo: createAction(`${SLICE_NAME}/fetchInitialInfo`),
  getList: createAction(`${SLICE_NAME}/getList`),
};

const reducers = {
  initState: () => initialState,
  setInitialInfo: (state) => {
    state.onload = true;
    state.number = 1;
  },
  setValue: {
    reducer: (state, { payload : { key, value }}) => {
      state[key] = value;
    },
    prepare: (key, value) => {
      return { payload : {key, value} };
    }
  },
  increase: (state, { payload : { data } }) => {
    state.number += data;
  },
  decrease: (state, { payload : { data } }) => {
    state.number -= data;
  }
}

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers,
});
export const getState = (state) => state[ROOT_SLICE_NAME][SLICE_NAME];
export const actions = {
  ...slice.actions,
  ...sagaAction,
}
export default slice.reducer;