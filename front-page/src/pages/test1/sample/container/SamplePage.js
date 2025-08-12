import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';
import { Container, Row, Col, Button } from 'react-bootstrap';
import FormInput from 'pages/components/FormInput';
import { useForm } from 'react-hook-form';

const SamplePage = () => {
  const dispatch = useDispatch();
  return (
    <div>
      두번째 샘플 페이지입니다.
    </div>
  )
}

export default React.memo(SamplePage);