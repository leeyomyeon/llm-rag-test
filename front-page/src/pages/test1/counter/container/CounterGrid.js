import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';
import { Form, Button, Table } from 'react-bootstrap';
import FormInputNumber from 'pages/components/FormInputNumber';
import { useForm } from 'react-hook-form';

const initialValues = {
  addNum: 1
}
const CounterGrid = () => {
  const dispatch = useDispatch();
  const [fieldNum, setFieldNum] = useState(1);

  const form = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initialValues
  });

  useEffect(() => {
    // 콘솔에 출력
    const subscription = form.watch((value, { name, type }) => {
      setFieldNum(value.addNum);
    })
    return () => subscription.unsubscribe();
  }, [form.watch]);


  const number = useSelector((state) => getState(state).number);
  
  const inc = () => {
    dispatch(actions.increase({ data : Number(form.getValues('addNum')) }));
  }
  const dec = () => {
    dispatch(actions.decrease({ data : Number(form.getValues('addNum')) }));
  }

  return (
    <Form>
      <Table striped bordered hover variant="dark">
        <tbody>
          <tr>
            <td colSpan={2} align='center'>
                <h1>{number}</h1>
            </td>
          </tr>
          <tr style={{ height: '80px'}}>
            <td colSpan={2}>
              <FormInputNumber
                id="addNum"
                label="값 입력"
                horizontal={true}
                useForm={form}
              />
            </td>
          </tr>
          <tr>
            <td align='center'>
              <Button onClick={dec}> - {fieldNum} </Button>
            </td>
            <td align='center'>
              <Button onClick={inc}> + {fieldNum} </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Form>
  )
}
export default CounterGrid;