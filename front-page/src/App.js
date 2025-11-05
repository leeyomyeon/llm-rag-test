import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CounterPage from 'pages/main/counter/container/CounterPage';
import LlmRagChatPage from 'pages/main/llmRagChat/container/LlmRagChatPage';
import LlmChatPage from 'pages/main/llmChat/container/LlmChatPage';
import ImgComposit from 'pages/main/imgComposit/container/ImgCompositPage';
import Home from 'pages/components/Home';
import Header from 'pages/components/Header';
import PageNotFound from 'pages/components/PageNotFound';
import './App.css';
import BackgroundPage from 'pages/components/BackgroundPage';
const path = "/llm-rag-test"

function App() {
  return (
    <BackgroundPage>
      <Header />
        <Routes>
        {/* exact={true}는 router가 경로값이 정확히 URL의 경로값과 일치할 때만 렌더링되도록 함  */}
        <Route exact={true} path={`${path}/`} element={<Home />} />
        <Route path={`${path}/counter`} element={<CounterPage />} />
        <Route path={`${path}/ragChat`} element={<LlmRagChatPage />} />
        <Route path={`${path}/llmChat`} element={<LlmChatPage />} />
        <Route path={`${path}/imgComposit`} element={<ImgComposit />} />
        <Route path={`${path}/*`} element={<PageNotFound />} />
      </Routes>
    </BackgroundPage>
  ); 
}

export default App;