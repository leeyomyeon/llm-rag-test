import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';

import LlmRagChatMainContainer from './LlmRagChatMainContainer';

const LlmRagChatPage = () => {
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
        <div>
          <LlmRagChatMainContainer />
        </div>
      ) : (
        <div>
          로딩 중...
        </div>
      )
    }
    </>
    
  )
}

export default React.memo(LlmRagChatPage);