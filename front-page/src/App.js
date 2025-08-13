import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CounterPage from 'pages/main/counter/container/CounterPage';
import ChatPage from 'pages/main/chat/container/ChatPage';
import Home from 'pages/components/Home';
import Header from 'pages/components/Header';
import PageNotFound from 'pages/components/PageNotFound';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* exact={true}는 router가 경로값이 정확히 URL의 경로값과 일치할 때만 렌더링되도록 함  */}
        <Route exact={true} path="/" element={<Home />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;