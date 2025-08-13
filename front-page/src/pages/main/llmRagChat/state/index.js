import { createSlice, createAction } from '@reduxjs/toolkit';

const ROOT_SLICE_NAME = 'main';
const SLICE_NAME = 'llmRagChat';

const initialState = {
  onload: false,
  messageList : [],
}

const sagaAction = {
  fetchInitialInfo : createAction(`${SLICE_NAME}/fetchInitialInfo`),
  sendMessage : createAction(`${SLICE_NAME}/sendMessage`),
};

const reducers = {
  initState: () => initialState,
  setInitialInfo: (state) => {
    state.onload = true;
  },
  setValue: {
    reducer: (state, { payload : { key, value }}) => {
      state[key] = value;
    },
    prepare: (key, value) => {
      return { payload : {key, value} };
    }
  },
  sendMessage : (state, { payload }) =>{
    state.messageList.push({ type: 'user' , message: payload });
  },
  receiveMessage : (state, { payload }) =>{
    state.messageList.push({ type: 'chatbot', message: payload });
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