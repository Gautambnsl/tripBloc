import React, { useState } from 'react';
import './regiterHotel.css';
import { ChatUIProvider, ChatView } from '@pushprotocol/uiweb';

const RegisterHotel = () => {
  const [inputMessage, setInputMessage] = useState(localStorage.getItem('chatID'));

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1 className="title">Hotel Admin Panel</h1>
        <button className="register-btn">Accept Proposal</button>
        <button className="register-btn">Reject Proposal</button>
        <input
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          placeholder="Type your message here"
        />
        <button className="register-btn">Push Chat</button>
        <button className="register-btn">Waku Chat</button>
      </div>
      <ChatUIProvider env="staging">
        <ChatView
          chatId={inputMessage}
          limit={10}
          isConnected={true}
          autoConnect={false}
        />
      </ChatUIProvider>
    </div>
  );
};

export default RegisterHotel;
