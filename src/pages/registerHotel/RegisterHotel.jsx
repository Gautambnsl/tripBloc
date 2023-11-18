import React, { useState } from 'react';
import './regiterHotel.css';
import { ChatUIProvider, ChatView } from '@pushprotocol/uiweb';

const RegisterHotel = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [isPushProtocolConnected, setIsPushProtocolConnected] = useState(false);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handlePushChatClick = () => {
    setIsPushProtocolConnected(true);
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
          placeholder={localStorage.getItem('chatID') || 'Enter the ChatID'}
        />
        <button className="register-btn" onClick={handlePushChatClick}>
          Push Chat
        </button>
        <button className="register-btn">Waku Chat</button>
      </div>
      {isPushProtocolConnected && (
        <>
          <ChatUIProvider env="staging">
            <ChatView
              chatId={inputMessage}
              limit={10}
              isConnected={isPushProtocolConnected}
              autoConnect={false}
            />
          </ChatUIProvider>
        </>
      )}
    </div>
  );
};

export default RegisterHotel;
