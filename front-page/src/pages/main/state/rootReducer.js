import { combineReducers } from 'redux';

import counter_Reducer from 'pages/main/counter/state/index';
import chat_Reducer from 'pages/main/chat/state/index';

const rootReducerMain = combineReducers({
  counter: counter_Reducer,
  chat: chat_Reducer,
})

export default rootReducerMain;