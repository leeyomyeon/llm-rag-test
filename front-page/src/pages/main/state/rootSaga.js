import { watchUnsplash as counter_WatchUnsplash } from 'pages/main/counter/state/saga';
import { watchUnsplash as llmRagChat_WatchUnsplash } from 'pages/main/llmRagChat/state/saga';
import { watchUnsplash as llmChat_WatchUnsplash } from 'pages/main/llmChat/state/saga';
import { watchUnsplash as imgComposit_WatchUnsplash } from 'pages/main/imgComposit/state/saga';

export const rootSagaMain = [
  counter_WatchUnsplash(),
  llmRagChat_WatchUnsplash(),
  llmChat_WatchUnsplash(),
  imgComposit_WatchUnsplash(),
]