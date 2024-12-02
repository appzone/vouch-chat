import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setChatroomData, setMessages } from './chatSlice';
import { toast } from 'react-toastify';

const ChatroomForm = ({ socket }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;
    socket.on('join_room_success', (messages) => {
      dispatch(setMessages({ messages }));
      navigate(`/chat`);
    });

    socket.on('join_room_failed', (message) => {
      toast.error(message);
    });

    return () => {
      socket.off('join_room_failed');
      socket.off('join_room_success');
      socket.off('chat_message');
    };
  }, [socket]);

  const handleJoin = (event) => {
    event.preventDefault();

    if (!username || !roomId) {
      toast.error('Please fill username and RoomId');
      return;
    }
    dispatch(setChatroomData({ username, roomId }));

    socket.emit('join_room', { username, roomId });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Section */}
      <div style={{ textAlign: 'center', flexGrow: 1 }}>
        <h1 style={{ fontSize: '24px', marginBottom: '15px' }}>Join Chatroom</h1>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='fieldInput'
          />
          <input
            type="text"
            placeholder="RoomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className='fieldInput'
          />
        </form>
      </div>

      <button
        onClick={handleJoin}
        className='joinButton'
      >
        JOIN
      </button>
    </div>
  );
};

export default ChatroomForm;
