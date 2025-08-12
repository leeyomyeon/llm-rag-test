import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const PageNotFound = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 6, offset: 3 }}>
              페이지를 찾을 수 없습니다.
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  )
}

export default PageNotFound;