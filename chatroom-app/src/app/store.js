import { configureStore } from '@reduxjs/toolkit';
import myChatReducer from '../features/chat/chatSlice';

const store = configureStore({
  reducer: {
	chat: myChatReducer,
   } 
});

export default store;
