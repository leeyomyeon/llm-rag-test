import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const HomeWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #2d3a5a;
  margin-bottom: 1rem;
  letter-spacing: -2px;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #4b5563;
  margin-bottom: 2rem;
`;

const StyledButton = styled(Button)`
  font-size: 1.1rem;
  padding: 0.75rem 2.5rem;
  border-radius: 2rem;
  background: linear-gradient(90deg, #6366f1 0%, #60a5fa 100%);
  border: none;
  font-weight: 600;
  transition: background 0.2s;
  text-decoration: none !important;
  color: #fff !important;
  &:hover {
    background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
    color: #fff !important;
    text-decoration: none !important;
  }
  &:visited, &:active, &:focus {
    color: #fff !important;
    text-decoration: none !important;
  }
`;

const Home = () => {
  return (
    <HomeWrapper>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} className="text-center">
            <Title>LLM + RAG Chatbot Demo</Title>
            <Subtitle>
              최신 AI 기술로 구현된 챗봇 데모에 오신 것을 환영합니다.<br />
              다양한 예제와 기능을 체험해보세요!
            </Subtitle>
            <StyledButton as={NavLink} to={`/llm-rag-test/ragChat`} >
              챗봇 체험하기
            </StyledButton>
          </Col>
        </Row>
      </Container>
    </HomeWrapper>
  );
};

export default Home;