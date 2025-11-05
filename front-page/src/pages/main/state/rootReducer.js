import { combineReducers } from 'redux';

import counter_Reducer from 'pages/main/counter/state/index';
import llmRagChat_Reducer from 'pages/main/llmRagChat/state/index';
import llmChat_Reducer from 'pages/main/llmChat/state/index';
import imgComposit_Reducer from 'pages/main/imgComposit/state/index';

const rootReducerMain = combineReducers({
  counter: counter_Reducer,
  llmRagChat: llmRagChat_Reducer,
  llmChat: llmChat_Reducer,
  imgComposit: imgComposit_Reducer,
})

export default rootReducerMain;