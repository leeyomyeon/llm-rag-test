import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, getState } from '../state';

import ChatMainContainer from './ChatMainContainer';

const ChatPage = () => {
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
          <ChatMainContainer />
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

export default React.memo(ChatPage);