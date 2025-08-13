import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ChatMainContainer = () => {

  const dispatch = useDispatch();
  const { register, getValues, handleSubmit, reset } = useForm();
  const messageList = useSelector(getState).messageList;

  const onSubmit = () => {
    dispatch(actions.sendMessage(getValues('message')));
    reset({ message: '' });
  };
  
  const formProps = {
    ...register("message", { required: true }),
  }

  return (
    <Container>

      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          {messageList.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.message}
            </div>
          ))}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Form.Control 
              {...formProps}
              id="message"
              placeholder="메시지를 입력하세요"
            />
            <Button variant="outline-primary" type="submit">보내기</Button>
          </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
export default React.memo(ChatMainContainer);
