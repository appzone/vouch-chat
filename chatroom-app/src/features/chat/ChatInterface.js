import React, {useState, useEffect , useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages,setIncomingMessage, setChatroomData } from './chatSlice';


const ChatInterface = ({ socket }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const { username, roomId, messages } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const scrollRef = useRef(null); 

  useEffect(() => {
    const savedChatroomData = localStorage.getItem('chatroomData');
    if (savedChatroomData) {
      dispatch(setChatroomData(JSON.parse(savedChatroomData)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      dispatch(setIncomingMessage({ message }));
      setMessage('');
    });
   
    return () => {
      socket.off('receive_message');
    };
   
  }, [socket]);

  useEffect(() => {
    if(username && roomId)
      socket.emit('rejoin_room', { username, roomId });
  }, [username, roomId])

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit('send_message', { username, roomId, message });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (message.trim() !== '') {
        sendMessage(event)
      }
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {/* Header Section */}
      <div
        className='headerSection'
      >
        <button
          className='exitButton'
          onClick={() => navigate('/')}
        >
          Exit
        </button>
        
        <h2
         className='roomTitle'
        >
          {roomId}
        </h2>
      </div>


      {/* Chat Messages */}
      <div style={{ flex: 1, padding: '15px', overflowY: 'auto' }}>
         {messages?.map((message) => {
            return message.username !== username ?
              <>
                <div style={{
                    marginLeft: '20px',
                  }}>{message.username}</div>
                <div
                  key={message._id}
                  className="chat-bubble"
                >
                  {message.message}
                </div>
              </>
            :  <div
                style={{
                    position: 'relative',
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                      key={message._id}
                      className="chat-bubble-outgoing"
                      >
                  {message.message}
            </div>
          </div>

         })}
        <div ref={scrollRef} />

      </div>

      {/* Input Section */}
      <div
        style={{
          padding: '10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
         className='messageWrapper'
        >
          <input
            type="text"
            placeholder="Message here..."
            value={message}
            onKeyDown={handleKeyDown}
            onChange={(e) => setMessage(e.target.value)}
            className='messageInput'
          />
          <button
            onClick={sendMessage}
            className='sendButton'
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;
