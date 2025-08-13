import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';
import { Form, Button, Stack, Card, CardImg, CardBody, CardText, CardTitle } from 'react-bootstrap';
import FormInput from 'pages/components/FormInput';
import { useForm } from 'react-hook-form';
import pakeWeekend from '../bin/pakeWeekend.png';
import FormModal from 'pages/components/FormModal';

const CounterApiGrid = () => {
  const dispatch = useDispatch();
  
  const form = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const onSubmit = () => {
    const apiKey = form.getValues('apiKey')
    dispatch(actions.getList(apiKey));
  }

  useEffect(() => {
    // 콘솔에 출력
    const subscription = form.watch((value, { name, type }) => {
      console.log(">>", value, name, type);
    })
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onButtonClick = () => {
    setModalVisible(!modalVisible);
  }
  const callBackModal = (value) => {
    form.setValue('apiKey', value);
    setModalVisible(false);
  }
  const onClose = () => {
    setModalVisible(false);
  }

  return (
    <>
      <Stack gap={2}>
        <div className="p-2">
          <Form>
            <FormInput
              label="API Key"
              id="apiKey"
              horizontal={true}
              labelSize={1}
              useForm={form}
            />
          </Form>
        </div>
        <div align='center'>
          <Button type="button" onClick={onSubmit}>조회</Button>
        </div>
        <div align={'center'}>
          <Card style={{ width: '18rem' }}>
            { <CardImg variant="top" src={pakeWeekend} /> }
            <CardBody>
              <CardTitle>이미지 테스트</CardTitle>
              <CardText>
                헐 벌써 주말이라니 거짓말같아. <br />
                당연함.<br /> 거짓말임
              </CardText>
              <div>
                <Button variant="primary" onClick={onButtonClick}>API Key 입력 모달</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </Stack>
      {modalVisible && (
        <FormModal
          title="제목"
          bodyText="내용"
          callBackFnc={callBackModal}
          visible={modalVisible}
          onClose={onClose}
        />
      )}
    </>
  )
}
export default CounterApiGrid;