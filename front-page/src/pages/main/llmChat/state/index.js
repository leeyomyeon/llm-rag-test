import { createSlice, createAction } from '@reduxjs/toolkit';

const ROOT_SLICE_NAME = 'main';
const SLICE_NAME = 'llmChat';

const initialState = {
  onload: false,
  isLoading: false,
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
    state.isLoading = true;
  },
  receiveMessage : (state, { payload }) =>{
    state.messageList.push({ type: 'chatbot', message: payload });
    state.isLoading = false;
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