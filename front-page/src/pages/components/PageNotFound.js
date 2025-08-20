import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
`;

const NotFoundBox = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  padding: 48px 32px 32px 32px;
  text-align: center;
  max-width: 420px;
  width: 100%;
`;

const Big404 = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: #6366f1;
  margin-bottom: 12px;
  letter-spacing: -2px;
`;

const Message = styled.div`
  font-size: 1.2rem;
  color: #374151;
  margin-bottom: 24px;
`;

const PageNotFound = () => {
  const navigate = useNavigate();
const [progress, setProgress] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(timer);
        navigate('/llm-rag-test/home');
        return prev;
      }
      return prev + 1;
    });
  }, 30); // 30ms * 100 = 3000ms = 3초
  return () => clearInterval(timer);
}, [navigate]);

  return (
    <NotFoundWrapper>
      <NotFoundBox>
        <Big404>404 - Page Not Found</Big404>
        <Message>
          페이지를 찾을 수 없습니다.<br />
          3초 뒤 메인 페이지로 이동합니다.
        </Message>
        <ProgressBar variant="info" now={progress} max={60} style={{height: '18px', borderRadius: '9px'}} />
      </NotFoundBox>
    </NotFoundWrapper>
  );
}

export default PageNotFound;