import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { FaLungs, FaHeart, FaBrain } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../API";

const ChatApp = (props) => {
  const [selectedDoctorType, setSelectedDoctorType] = useState(null);
  const [showPreviousChats, setShowPreviousChats] = useState(true);
  const [isNewChatStarted, setIsNewChatStarted] = useState(false);
  const [mostratutto, setmostratutto] = useState(true);
  const [messages, setMessages] = useState([]);
  const [fakechatpartita, setFakechatpartita] = useState(false);
  const [chatpassate, setChatPassate] = useState([]);
  const [posted, setposted] = useState(0);
  const [dottoreDB, setdottoreDB] = useState();
  const [doc, setdoc] = useState();

  const doctorsType = [
    { id: 2, type: "Pneumologist" },
    { id: 3, type: "Cardiologist" },
    { id: 5, type: "Psychologist" },
  ];
  const [messaggigiusti, setmessaggigiusti] = useState([]);

  const postata = () => {
    setposted((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messaggiDB = await API.getChatExpert();
        setMessages(messaggiDB);

        // Filtra solo i dottori dove chatpassate è uguale a 1 e rimuovi le ripetizioni
        const chatPassateDottori = [
          ...new Set(
            messaggiDB
              .filter((message) => message.chatpassata === 1)
              .map((message) => message.dottore)
          ),
        ];

        // Costruisci un array di oggetti chatpassate
        const chatPassate = chatPassateDottori.map((dottore, index) => {
          // Qui puoi aggiungere altre informazioni se necessario
          return {
            id: index + 1, // Id unico per ogni sender
            doctor: dottore,
            experienceYears: 8, // Aggiungi l'anno di esperienza qui se disponibile
            specialization: "Cardiologist", // Aggiungi la specializzazione qui se disponibile
          };
        });

        setChatPassate(chatPassate); // Imposta chatPassate con l'array di oggetti chatpassate

        console.log(chatPassate);
      } catch (error) {
        console.error("Errore durante il recupero dei messaggi:", error);
      }
    };

    fetchData();
  }, [posted]);

  const doctors = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      experienceYears: 10,
      specialization: "Psychologist",
    },
    {
      id: 2,
      firstName: "Emma",
      lastName: "Johnson",
      experienceYears: 15,
      specialization: "Psychologist",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Williams",
      experienceYears: 8,
      specialization: "Cardiologist",
    },
    {
      id: 4,
      firstName: "Sophia",
      lastName: "Brown",
      experienceYears: 12,
      specialization: "Cardiologist",
    },
    {
      id: 5,
      firstName: "Olivia",
      lastName: "Jones",
      experienceYears: 20,
      specialization: "Cardiologist",
    },
    {
      id: 6,
      firstName: "James",
      lastName: "Davis",
      experienceYears: 18,
      specialization: "Cardiologist",
    },
    {
      id: 7,
      firstName: "Isabella",
      lastName: "Miller",
      experienceYears: 9,
      specialization: "Psychologist",
    },
    {
      id: 8,
      firstName: "William",
      lastName: "Wilson",
      experienceYears: 14,
      specialization: "Psychologist",
    },
    {
      id: 9,
      firstName: "Ava",
      lastName: "Moore",
      experienceYears: 11,
      specialization: "Pneumologist",
    },
    {
      id: 10,
      firstName: "Ethan",
      lastName: "Taylor",
      experienceYears: 16,
      specialization: "Pneumologist",
    },
    {
      id: 11,
      firstName: "Mia",
      lastName: "Martinez",
      experienceYears: 13,
      specialization: "Pneumologist",
    },
    {
      id: 12,
      firstName: "Alexander",
      lastName: "Anderson",
      experienceYears: 17,
      specialization: "Pneumologist",
    },
    {
      id: 13,
      firstName: "Charlotte",
      lastName: "Wilson",
      experienceYears: 10,
      specialization: "Cardiologist",
    },
    {
      id: 15,
      firstName: "Emily",
      lastName: "White",
      experienceYears: 8,
      specialization: "Psychologist",
    },
    {
      id: 17,
      firstName: "Abigail",
      lastName: "Martin",
      experienceYears: 20,
      specialization: "Pneumologist",
    },
  ];

  const handleDoctorClick = (doctorType) => {
    setSelectedDoctorType(doctorType);
    // Assicura che la visualizzazione delle chat passate venga mostrata se si seleziona un medico
  };

  const handleTornaIndietro = () => {
    setShowPreviousChats(true);
    setIsNewChatStarted(false);
    setmostratutto(true);
    setFakechatpartita(false);
    // Assicura che la visualizzazione delle chat passate venga mostrata se si seleziona un medico
  };

  const handleNewChat = (doctorname) => {

    const filteredMessages = messages.filter(
      (message) => message.dottore === doctorname && message.chatpassata === 1
    );
    setmessaggigiusti(filteredMessages);
    setdottoreDB(doctorname);
    // Qui puoi gestire l'avvio di una nuova chat con il medico selezionato
    setIsNewChatStarted(true);
    setShowPreviousChats(false);
    setmostratutto(false);
    setFakechatpartita(true);
    setSelectedDoctorType(null);
  };

  const filteredDoctors = selectedDoctorType
    ? doctors.filter((doctor) => doctor.specialization === selectedDoctorType)
    : [];

  return (
    <Container className="row-small">
      <Row className="mt-3">
        {isNewChatStarted && (
          <>
          <Col className="go-back">
            <Button
              className="color-bottone-second"
              onClick={() => {
                handleTornaIndietro();
              }}
            >
              Go Back
            </Button>
          </Col>
          {fakechatpartita && (
          <Col>
          <h3 className='nome-doc'>{dottoreDB}</h3>
          </Col>
          )}
          </>
        )}
      </Row>
      {showPreviousChats && (
        <>
          <Row className="mt-3 text-center">
            <Col>
              <h2>Previous Chat</h2>
            </Col>
          </Row>
          <Row className="mt-3 ">
            <Col sm={8} className="mx-auto">
              <ListGroup>
                {chatpassate.map((doctor) => (
                  <ListGroup.Item key={doctor.id}>
                    {doctor.doctor}
                    <Button
                      onClick={() => {
                        setdottoreDB(doctor.doctor);
                        console.log(doctor.doctor);
                        handleNewChat(doctor.doctor);
                      }}
                      className="color-bottone-second float-end"
                    >
                      Open Chat
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}

      <Row className="mt-3" >
              <Col className="text-center">
                {!isNewChatStarted && (
                  <Button
                  className='color-bottone'
                    onClick={() => {
                      setShowPreviousChats(false);
                      setIsNewChatStarted(true);
                    }}
                  >
                    Start a new Chat
                  </Button>
                )}
              </Col>
      </Row>


      {!showPreviousChats && isNewChatStarted && mostratutto && (
        <>
          <Row className="mt-3 text-center">
            <Col>
              <h2>Choose an expert</h2>
            </Col>
          </Row>
          <Row className="mt-3">
            {doctorsType.map((doctor, index) => (
              <Col key={index} className="text-center mb-3">
                <Button
                  className={`${selectedDoctorType === doctor.type ? 'esperti-attivo' : 'esperti'}`}
                  onClick={() => handleDoctorClick(doctor.type)}
                >
                   <span style={{ display: "block" }}>
                  {/* Inserisci l'icona del dottore all'interno del bottone */}
                  {doctor.type === "Pneumologist" && <FaLungs />}
                  {doctor.type === "Cardiologist" && <FaHeart />}
                  {doctor.type === "Psychologist" && <FaBrain />}
                  </span>
                  {doctor.type}
                </Button>
              </Col>
            ))}
          </Row>
        </>
      )}

      {selectedDoctorType && !showPreviousChats && isNewChatStarted && (
        <>        
        <Row className="mt-3">
          <Col className="tipo-dott">
            <h3>{selectedDoctorType}s</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <br></br>
            <ListGroup>
              {filteredDoctors.map((doctor) => (
                <ListGroup.Item key={doctor.id}>
                  <Row>
                    <Col>Name: {doctor.firstName}</Col>
                    <Col>Surname: {doctor.lastName}</Col>
                    <Col>Years of experience: {doctor.experienceYears}</Col>
                    <Col>
                  <Link to="/chatexpert">
                    <Button
                      className="color-bottone-second float-end"
                      onClick={() =>
                        props.cambiodottore(`Dr.${doctor.lastName} (${doctor.specialization})`)
                      }
                    >
                      Start chat
                    </Button>
                  </Link>
                  </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
        </>
      )}

      {fakechatpartita && (
        <ChatComponent
          messages={messaggigiusti}
          postata={postata}
          dottoreDB={dottoreDB}
        />
      )}
    </Container>
  );
};

const ChatComponent = (props) => {
  const [messages, setMessages] = useState(props.messages);
  const [posted, setposted] = useState(0);
  const chatContainerRef = useRef(null);

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messaggiDB = await API.getChatExpert();

        const filteredMessages = messaggiDB.filter(
          (message) =>
            message.dottore === props.dottoreDB && message.chatpassata === 1
        );
        setMessages(filteredMessages);
      } catch (error) {
        console.error("Errore durante il recupero dei messaggi:", error);
      }
    };

    fetchData();
  }, [posted]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      const updatedMessage = {
        sender: "David87",
        text: newMessage,
        chatpassata: 1,
        dottore: props.dottoreDB,
      };
      setNewMessage("");
      API.sendChatExpert(updatedMessage).then(setposted((prev) => prev + 1));
    }
  };

  return (
    <div>
      {" "}
      {/* Applica la classe container-chat dal CSS fornito */}
      <div className="message-container  row-small" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={` ${message.sender === "David87" ? "user-message" : ""}`}
          >
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
      <form onSubmit={handleSendMessage} className="form-container">
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
  );
};

export { ChatApp };
