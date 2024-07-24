/*
import React, { useState } from 'react';

const ChatMessage = ({ isUser, text }) => (
  <div style={{ textAlign: isUser ? 'right' : 'left', margin: '10px' }}>
    <div style={{ background: isUser ? '#5bc0de' : '#d3d3d3', padding: '10px', borderRadius: '8px', display: 'inline-block' }}>
      {text}
    </div>
  </div>
);

const FakeChat = () => {
  const [messages, setMessages] = useState([
    { isUser: false, text: 'Hello! How can I help you?' },
    { isUser: true, text: 'Hi! I have a question.' },
    { isUser: false, text: 'Sure, go ahead and ask.' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      const updatedMessages = [...messages, { isUser: true, text: newMessage }];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <ChatMessage key={index} isUser={message.isUser} text={message.text} />
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ flex: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export { FakeChat};
*/
/*
import React, { useState } from 'react';

const ChatMessage = ({ sender, text, time }) => (
  <div style={{ textAlign: 'left', margin: '10px' }}>
    <div style={{ background: '#d3d3d3', padding: '10px', borderRadius: '8px', display: 'inline-block' }}>
      <div style={{ marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>{sender}</div>
      <div>{text}</div>
      <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>{time}</div>
    </div>
  </div>
);

const FakeChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'Support', text: 'Hello! How can I help you?', time: '12:00 PM' },
    { sender: 'User', text: 'Hi! I have a question.', time: '12:05 PM' },
    { sender: 'Support', text: 'Sure, go ahead and ask.', time: '12:10 PM' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      const updatedMessages = [
        ...messages,
        { sender: 'User', text: newMessage, time: new Date().toLocaleTimeString() },
      ];
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender}
            text={message.text}
            time={message.time}
          />
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div style={{ marginTop: '10px', display: 'flex' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            style={{ flex: 1, marginRight: '10px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export { FakeChat};

*/

/*

import React, { useState, useRef, useEffect } from 'react';
import API from '../API';



const ChatMessage = ({ sender, text }) => (
  <div className="message">
    <div className="message-box">
      <div className="sender-info">
        <i className="icon bi bi-person-fill"></i>
        {sender}
      </div>
      <div className="message-text">{text}</div>
    </div>
  </div>
);

const FakeChat = (props) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const [posted,setposted]=useState(0);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const messaggiDB = await API.getChatMessage();
        setMessages(messaggiDB);
      } catch (error) {
        console.error("Errore durante il recupero dei messaggi:", error);
      }
    };
    
    fetchData();
  }
    
    ,[props.posted]);
    
  


  const  handleSendMessage =  (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      const updatedMessage =
        { sender: 'David87', text: newMessage };
       API.sendChatMessage(updatedMessage);
      setNewMessage('');
      props.setposted(prev=>prev+1);
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="container-chat fixed-chat">
        <div className='community'>
            <p>Community</p>
        </div>
      <div ref={chatContainerRef} className="message-container">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            sender={message.sender}
            text={message.Text}
          />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="form-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {setNewMessage(e.target.value)}}
          className="input-box"
          placeholder="Type your message..."
        />
        <button type="submit" className="send-button">
        <i className="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  );
};

export { FakeChat };

*/
import React, { useState, useRef, useEffect } from 'react';
import API from '../API';
import { Modal, Table, Form, Button,Container,Row,Col } from 'react-bootstrap/'
import { FaTrash } from 'react-icons/fa';

const ChatMessage = ({ sender, text, onDelete,id }) => (
  <div className="message">
    <div className="message-box">
      <div className="sender-info">
        <i className="icon bi bi-person-fill"></i>
        {sender}
        {sender === 'David87' && (
          <button onClick={() => onDelete(id)}>X</button>
        )}
      </div>
      <div className="message-text">{text}</div>
    </div>
  </div>
);



const FakeChat = (props) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [idDeleteMsg,setDeleteMsg]= useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messaggiDB = await API.getChatMessage();
        setMessages(messaggiDB);
      } catch (error) {
        console.error("Errore durante il recupero dei messaggi:", error);
      }
    };

    fetchData();
  }, [props.posted]);

  useEffect(() => {
    const sendMessage = async (sender, text) => {
      const newmsg = { sender, text };
      await API.sendChatMessage(newmsg);
      props.setposted(prev => prev + 1);
    };
  
    const timers = [
      setTimeout(() => sendMessage('Luigi24', "Congratulations David, keep it up!"), 10000),
      setTimeout(() => sendMessage('Sarah88', "You're doing great, David! Keep pushing forward!"), 20000),
      setTimeout(() => sendMessage('JohnDoe', "Stay strong, David! You've got this!"), 30000),
      setTimeout(() => sendMessage('AliceSmith', "Believe in yourself, David. You're making progress!"), 40000),
      setTimeout(() => sendMessage('Michael123', "One step at a time, David. You're on the right path!"), 50000),
      setTimeout(() => sendMessage('EmilyGreen', "Keep going, David! You're stronger than you think!"), 60000)
    ];
    
  return () => {
    timers.forEach(timer => clearTimeout(timer));
  };
}, []);
  

  const mostrmodale=(id) =>{
    setShowModal(true);
    setDeleteMsg(id);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== '') {
      const updatedMessage = { sender: 'David87', text: newMessage };
      API.sendChatMessage(updatedMessage);
      setNewMessage('');
      props.setposted(prev => prev + 1);
    }
  };

  const handleDeleteMessage = async () => {
    try {
      console.log(idDeleteMsg)
      await API.deleteChatMessage(idDeleteMsg);
      props.setposted(prev => prev + 1);
      setShowModal(false);
    } catch (error) {
      console.error("Errore durante l'eliminazione del messaggio:", error);
    }
  };

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="container-chat fixed-chat">
      <div className='community'>
        <p>Community</p>
      </div>
      <div ref={chatContainerRef} className="message-container">
        {messages.map((message, index) => (
          <div className="message">
          <div className={message.sender === 'David87' ? "message-box-david" : "message-box"}>
            <div className="sender-info">
              <i className="icon bi bi-person-fill"></i>
              {message.sender}
              {message.sender === 'David87' && (
               <button className="delete-chat" onClick={() => mostrmodale(message.ID)}>
               <FaTrash />
             </button>
              )}
            </div>
            <div className="message-text">{message.Text}</div>
          </div>
        </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="form-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => { setNewMessage(e.target.value) }}
          className="input-box"
          placeholder="Type your message..."
        />
        <button type="submit" className="send-button">
          <i className="bi bi-send-fill"></i>
        </button>
      </form>
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{"Are you sure to delete the message?"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>If you press delete, the message will be canceled.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className='color-bottone-second' onClick={handleCloseModal}>
              Close
            </Button>
            <Button className='color-bottone' onClick={handleDeleteMessage}>
            Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export { FakeChat };

