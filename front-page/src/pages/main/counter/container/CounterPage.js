import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';
import CounterGrid from './CounterGrid';
import CounterApiGrid from './CounterApiGrid';
import CounterCarousel from './CounterCarousel';

const CounterPage = () => {
  const dispatch = useDispatch();
  const onload = useSelector((state) => getState(state).onload);

  useEffect(() => {
    dispatch(actions.fetchInitialInfo());

    return () => {
      dispatch(actions.initState());
    }
  }, [dispatch]);

  return (
    <>
      {
        onload && (
          <div>
            <Container>
              <Row>
                <Col sm={8}>
                  <CounterGrid />
                </Col>
                <Col sm={4}>
                  <CounterCarousel />
                </Col>
              </Row>
              <Row>
                <CounterApiGrid />
              </Row>
            </Container>
          </div>
        )
      }
    </>
  )
}

export default React.memo(CounterPage);