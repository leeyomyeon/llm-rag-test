import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import FormInput from 'pages/components/FormInput';
import { useForm } from 'react-hook-form';

const ChatMainContainer = () => {

  const dispatch = useDispatch();
  const form = useForm();

  const onSubmit = (data) => {
    form.reset();
  };

  return (
    <Container>

      <Row>

      </Row>
      <Row>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <Col sm={8}>
            <FormInput
              id="message"
              useForm={form}
              placeholder="메시지를 입력하세요"
              required
            />
          </Col>
          <Col sm={4}>
            <Button variant="primary" onClick={onSubmit}>보내기</Button>
          </Col>
      </Form>
        
      </Row>
    </Container>
  )
}
export default React.memo(ChatMainContainer);
