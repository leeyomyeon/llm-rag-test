import React, { useState } from 'react';
import { FormGroup, FormLabel, FormControl, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const FormInputNumber = ({id, label, horizontal = false, labelSize = 2, useForm, ...props}) => {
  const onKeyDown = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
    }
  }
  const {
    register,
    getValues,
    setValue,
    watch
  } = useForm;

  const [validate, setValidate] = useState(false);

  const chkNumber = (e) => {
    const regex = /[^0-9]/g;
    if(regex.test(e.target.value)) {
      setValidate(true);
      setTimeout(() => {
        setValidate(false);
      }, 2000)
    }
    const res = e.target.value.replace(regex,'');
    setValue(id, res);
  }

  const formProps = {
    ...register(id),
    ...props,
    onKeyDown : onKeyDown,
    onChange: chkNumber,
    isInvalid:validate,
  }

  const formControl = () => {
    return (
      <>
        <FormControl {...formProps} />
        <FormControl.Feedback type="invalid">
          숫자만 입력 할 수 있습니다.
        </FormControl.Feedback>
      </>
    )
  }
  return (
    <>
    {/* 
        FormGroup controlId = HTML에서 Element의 ID임
        FormControl register를 등록해두면 
        useForm에 의해 값을 가져올 수 있음.
    */}
    {
      horizontal ? (
        <FormGroup controlId={`formInput${id}`} as={Row} >
          <FormLabel column sm={labelSize}>{label}</FormLabel>
          <Col>
            {formControl()}
          </Col>
        </FormGroup>
      ) : (
        <FormGroup controlId={`formInput${id}`}>
          <FormLabel>{label}</FormLabel>
          <Col>
            {formControl()}
          </Col>
        </FormGroup>
      )}            
  </>
  )
};

export default FormInputNumber;