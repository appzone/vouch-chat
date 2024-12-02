import React, {useMemo} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatroomForm from './features/chat/ChatroomForm';
import ChatInterface from './features/chat/ChatInterface';
import io from 'socket.io-client';
function App() {
  const socket = useMemo(() => io('http://localhost:4000'), []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatroomForm socket={socket}/>} />
        <Route path="/chat" element={<ChatInterface socket={socket}/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
