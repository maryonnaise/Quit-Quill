/*import React, { useState , useEffect} from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../API';



const Chatexpert = (props) => {
    const [messages, setMessages] = useState([]);

  
    const [newMessage, setNewMessage] = useState('');

    const [posted,setposted]=useState(0);

    useEffect(() => {
  
      const fetchData = async () => {
        try {
          const messaggiDB = await API.getChatExpert();
          setMessages(messaggiDB);
        } catch (error) {
          console.error("Errore durante il recupero dei messaggi:", error);
        }
      };
      
      fetchData();
    }
      
      ,[posted]);

      const handleTornaIndietro= () => {

        console.log("propso.dottore E uguale",props.dottore)
        API.modifyExpertChat(props.dottore)

      }
  
      const  handleSendMessage =  (event) => {
        event.preventDefault();
        if (newMessage.trim() !== '') {
          const updatedMessage =
            { sender: 'David87', text: newMessage , chatpassata:0, dottore:props.dottore};
           API.sendChatExpert(updatedMessage);
          setNewMessage('');
         setposted(prev=>prev+1);
        }
      };
  
    return (
        <Container>
             <Row className="mt-1">
            <Col>
            <Link to="/askexperts">
              <Button variant="outline-primary" onClick={() =>{handleTornaIndietro()}
                      
                      }>Torna indietro</Button>
              </Link>
            </Col>
          </Row>
            <Row >
      <div > 
      <div className="message-container row-small">
  {messages
    .filter(message => message.chatpassata === 0) // Filtra solo i messaggi con chatpassate = 0
    .map((message, index) => (
      <div key={index} className={` ${message.sender === 'David87' ? 'user-message' : ''}`}>
        <div className="message-box">
          <div className="sender-info">
            <i className="icon bi bi-person-fill"></i>
            {message.sender}
          </div>
          <div className="message-text">{message.text}</div>
        </div>
      </div>
    ))}
</div>
        <form onSubmit={handleSendMessage} className="form-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="input-box"
            placeholder="Scrivi un messaggio..."
          />
          <button type="submit" className="send-button">
          <i className="bi bi-send-fill"></i>
          </button>
        </form>
      </div>
      </Row>
      </Container>
    );
  };

export {Chatexpert};



import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../API';

const Chatexpert = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [posted, setPosted] = useState(0);
    const [index,setindex]=usestae(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const messaggiDB = await API.getChatExpert();
                setMessages(messaggiDB);
            } catch (error) {
                console.error("Errore durante il recupero dei messaggi:", error);
            }
        };
      
        fetchData();
    }, [posted]);

    const handleTornaIndietro = () => {
        console.log("props.dottore è uguale", props.dottore);
        API.modifyExpertChat(props.dottore);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (newMessage.trim() !== '') {
            const userMessage = {
                sender: 'David87',
                text: newMessage,
                chatpassata: 0,
                dottore: props.dottore
            };

            // Invia il messaggio dell'utente
            API.sendChatExpert(userMessage);
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setNewMessage('');
            setPosted(prev => prev + 1);

            // Definisci una lista di messaggi finti del dottore
            const fakeDoctorMessages = [
                "Ciao, come posso aiutarti?",
                "Sto aspettando ulteriori informazioni.",
                "Per favore, descrivi meglio il tuo problema.",
                "Posso consigliarti alcuni passi da seguire."
            ];
            let index=0;

            // Imposta un ritardo di 1 secondo tra l'invio di ciascun messaggio finto del dottore
            
                setTimeout(() => {
                    const doctorMessage = {
                        sender: props.dottore,
                        text: fakeDoctorMessages[index],
                        chatpassata: 0,
                        dottore: props.dottore
                    };
                    API.sendChatExpert(doctorMessage);
                    setPosted(prev => prev + 1);
                }, 1000); 
                index=index+1;// Ritardo incrementale per ogni messaggio
            
        }
    };

    return (
        <Container>
            <Row className="mt-1">
                <Col>
                    <Link to="/askexperts">
                        <Button variant="outline-primary" onClick={handleTornaIndietro}>
                            Torna indietro
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <div>
                    <div className="message-container row-small">
                        {messages
                            .filter(message => message.chatpassata === 0)
                            .map((message, index) => (
                                <div key={index} className={` ${message.sender === 'David87' ? 'user-message' : ''}`}>
                                    <div className="message-box">
                                        <div className="sender-info">
                                            <i className="icon bi bi-person-fill"></i>
                                            {message.sender}
                                        </div>
                                        <div className="message-text">{message.text}</div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="form-container">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="input-box"
                            placeholder="Scrivi un messaggio..."
                        />
                        <button type="submit" className="send-button">
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </form>
                </div>
            </Row>
        </Container>
    );
};

export { Chatexpert };
*/

import React, { useState, useEffect,useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import API from '../API';

const Chatexpert = (props) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [posted, setPosted] = useState(0);
    const chatContainerRef = useRef(null);
    const [doctorMessagesIndex, setDoctorMessagesIndex] = useState(0); // Indice per i messaggi finti del dottore

    useEffect(() => {
        const fetchData = async () => {
            try {
                const messaggiDB = await API.getChatExpert();
                setMessages(messaggiDB);
            } catch (error) {
                console.error("Errore durante il recupero dei messaggi:", error);
            }
        };
      
        fetchData();
    }, [posted]);

    const handleTornaIndietro = () => {
        console.log("props.dottore è uguale", props.dottore);
        console.log(props.dottore)
        API.modifyExpertChat(props.dottore);
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (newMessage.trim() !== '') {
            const userMessage = {
                sender: 'David87',
                text: newMessage,
                chatpassata: 0,
                dottore: props.dottore
            };

            // Invia il messaggio dell'utente
           await API.sendChatExpert(userMessage);
            setNewMessage('');
            setPosted(prev => prev + 1);

            // Definisci una lista di messaggi finti del dottore
            const fakeDoctorMessages = [
                "Hi! How can I help you?",
                "Tell me more about this problem, when does it happen?",
                "Are you alone when this happens?",
                "Okay, now I will give you some advices"
            ];

            // Invia i messaggi finti del dottore in sequenza
            setTimeout(() => {
                const nextDoctorMessageIndex = doctorMessagesIndex % fakeDoctorMessages.length;
                const doctorMessage = {
                    sender: props.dottore,
                    text: fakeDoctorMessages[nextDoctorMessageIndex],
                    chatpassata: 0,
                    dottore: props.dottore
                };
                API.sendChatExpert(doctorMessage);
                setPosted(prev => prev + 1);
                setDoctorMessagesIndex(prevIndex => prevIndex + 1); // Incrementa l'indice per ottenere il prossimo messaggio finti del dottore
            }, 1000 ); // Ritardo incrementale per ogni messaggio finto del dottore
        }
    };

    useEffect(() => {
      // Scroll to the bottom when messages change
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [messages]);

    return (
        <Container className='row-small'>
            <Row className="mt-1">
                <Col className="go-back">
                    <Link to="/askexperts">
                        <Button className="color-bottone-second" onClick={handleTornaIndietro}>
                            Go Back
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <h3 className='nome-doc'>{props.dottore}</h3>
                </Col>
            </Row>
            <Row>
                <div>
                    <div className="message-container " ref={chatContainerRef}>
                        {messages
                            .filter(message => message.chatpassata === 0)
                            .map((message, index) => (
                                <div key={index} className={` ${message.sender === 'David87' ? 'user-message' : ''}`}>
                                    <div className={message.sender === 'David87' ? "message-box-david" : "message-box"}>
                                        <div className="sender-info">
                                            <i className="icon bi bi-person-fill"></i>
                                            {message.sender}
                                        </div>
                                        <div className="message-text">{message.text}</div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="form-container ">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="input-box"
                            placeholder="Write a message..."
                        />
                        <button type="submit" className="send-button-expert">
                            <i className="bi bi-send-fill"></i>
                        </button>
                    </form>
                </div>
            </Row>
        </Container>
    );
};

export { Chatexpert };


