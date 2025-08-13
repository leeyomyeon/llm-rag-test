import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';
import { Container, Row, Col, Button, Form, InputGroup, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import MarkDownForm from 'pages/components/MarkDownForm';
import styled from 'styled-components';

const ChatMainContainer = () => {

  const dispatch = useDispatch();
  const { register, getValues, handleSubmit, reset } = useForm();
  const messageList = useSelector(getState).messageList;
  const [isLoading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    dispatch(actions.sendMessage(getValues('message')));
    reset({ message: '' });
    setLoading(false);
  };
  
  const formProps = {
    ...register("message", { required: true }),
  }

  return (
    <Container>

      <Row className="justify-content-md-center" style={{paddingBottom: '16px'}}>
        <Col xs={12} md={8}>
          <Styled.MessageField>
            <Stack gap={3}>
              {messageList.map((msg, index) => (
                <div key={index} className={`message-${msg.type}`}>
                  {msg.type === 'chatbot' ?
                      (<MarkDownForm markdownText={msg.message} />)
                    :
                      (<>{msg.message}</>)
                  }
                </div>
              ))}
            </Stack>
        </Styled.MessageField>
        </Col>
      </Row>
      <Row className="justify-content-md-center" style={{paddingBottom: '16px'}}>
        <Col xs={12} md={8}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Form.Control 
              {...formProps}
              id="message"
              placeholder="메시지를 입력하세요"
              rows={3}
            />
            <Button 
              variant="outline-primary" 
              type="submit"
              disabled={isLoading}
            >
                {isLoading ? '확인 중...' : '보내기'}
            </Button>
          </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
export default React.memo(ChatMainContainer);

const Styled = {
  MessageField: styled.div`
    min-height: 800px;
    max-height: 800px;
    background: #fafbfc;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 24px 12px 32px 12px;
    margin-bottom: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .message-chatbot, .message-user {
      display: inline-block;
      max-width: 75%;
      word-break: break-word;
      padding: 12px 18px;
      border-radius: 18px;
      font-size: 1rem;
      margin-bottom: 4px;
      position: relative;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    .message-chatbot {
      align-self: flex-start;
      background: #f1f0f0;
      color: #222;
      border-bottom-left-radius: 4px;
      &::before {
        content: "";
        position: absolute;
        left: -10px;
        top: 16px;
        border-width: 8px 10px 8px 0;
        border-style: solid;
        border-color: transparent #f1f0f0 transparent transparent;
      }
    }

    .message-user {
      align-self: flex-end;
      background: #d1e7dd;
      color: #222;
      border-bottom-right-radius: 4px;
      text-align: right;
      &::before {
        content: "";
        position: absolute;
        right: -10px;
        top: 16px;
        border-width: 8px 0 8px 10px;
        border-style: solid;
        border-color: transparent transparent transparent #d1e7dd;
      }
    }
  `
}