import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';
import LlmChatMainContainer from './LlmChatMainContainer';

const LlmChatPage = () => {
  const dispatch = useDispatch();
  const onload = useSelector((state) => getState(state).onload);
  
  useEffect(() => {
    dispatch(actions.fetchInitialInfo());

    return () => {
      
    }
  }, [dispatch]);

  return (
    <>
    {
      onload ? (
        <LlmChatMainContainer />
      ) : (
        <div>
          로딩 중...
        </div>
      )
    }
    </>
    
  )
}

export default React.memo(LlmChatPage);