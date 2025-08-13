import { watchUnsplash as counter_WatchUnsplash } from 'pages/main/counter/state/saga';
import { watchUnsplash as chat_WatchUnsplash } from 'pages/main/chat/state/saga';

export const rootSagaMain = [
  counter_WatchUnsplash(),
  chat_WatchUnsplash(),
]