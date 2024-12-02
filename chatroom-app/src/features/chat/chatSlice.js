import { createSlice } from '@reduxjs/toolkit';

const myChatSlice = createSlice({
  name: 'chat',
  initialState: {
    username: '',
    roomId: '',
	messages: [],
  },
  reducers: {
	setMessages: (state, action) => {
		state.messages = action.payload.messages
		localStorage.setItem('chatroomData', JSON.stringify(state));
	},
	setIncomingMessage: (state, action) => {
		state.messages = [ ...state.messages, action.payload.message ]
		localStorage.setItem('chatroomData', JSON.stringify(state));
	},
	setChatroomData: (state, action) => {
      state.username = action.payload.username;
      state.roomId = action.payload.roomId;
	  if(action.payload.messages) {
		state.messages = action.payload.messages
	  }
	  localStorage.setItem('chatroomData', JSON.stringify(state));
    },
    clearChatroomData: (state) => {
      state.username = '';
      state.roomId = '';
    },
  },
});

export const { setMessages, setIncomingMessage, setChatroomData, clearChatroomData } = myChatSlice.actions;
export default myChatSlice.reducer;