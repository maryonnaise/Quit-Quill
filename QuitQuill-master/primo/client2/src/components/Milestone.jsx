import React, { useState, useEffect } from 'react';
import { Modal, Button, Col, Row, Toast } from 'react-bootstrap';
import API from '../API';
import '../APP.css'; // Assicurati di avere un file CSS per lo stile delle milestone

function Milestone(props) {
  const [milestones, setMilestones] = useState([]);
  const [showModal, setShowModal] = useState(false); // Stato per controllare la visibilità del modal
  const [selectedMilestone, setSelectedMilestone] = useState(null); // Stato per memorizzare la milestone selezionata
  const [showToast, setShowToast] = useState(false);

  const toggleToast = () => {
    setShowToast(!showToast);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const  handleSendMessage = async (text) => {
      const updatedMessage =
        { sender: "David87", text: text };
      await API.sendChatMessage(updatedMessage);
       props.setposted();
       toggleToast();
    }

    useEffect(() => {
      // Carica le milestone quando il componente viene montato
      const fetchMilestones = async () => {
        const data = await API.fetchMilestones();
        setMilestones(data);
      };
  
      fetchMilestones(); // Chiamata iniziale per caricare le milestone
  
      // Imposta un intervallo per eseguire il fetch delle milestone ogni secondo
      const interval = setInterval(fetchMilestones, 500);
  
      // Pulisce l'intervallo quando il componente viene smontato
      return () => clearInterval(interval);
    }, []);

  // Funzione per ottenere un'icona di trofeo se la milestone è stata raggiunta
  const getAchievedIcon = (milestone) => {
    if (milestone.Achieved) {
      return (
        <div>
          <span className="trophy">🏆</span>
          {milestone.Achieved === 1 && (
            <span
              className="share-icon"
              onClick={() => {
                setSelectedMilestone(milestone);
                setShowModal(true);
              }}
              title="Condividi"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
              </svg>
            </span>
          )}
        </div>
      );
    }
    return null;
  };

  // Funzione per condividere la milestone
  const shareMilestone = (text) => {
    const newtext = "Hey friends! I have achieved this milestone: \"" + text + "\"";
    handleSendMessage(newtext)
    setShowModal(false); // Chiudi il modal dopo aver condiviso la milestone
 // Ricarica la pagina dopo l'invio del messaggio
  };

  // Raggruppa le milestone per tipo
  const milestonesByType = milestones.reduce((acc, milestone) => {
    acc[milestone.Type] = [...(acc[milestone.Type] || []), milestone];
    return acc;
  }, {});

  return (
    <div className="milestone-container">
      <div style={{ display: 'flex', flexDirection: 'row' }}></div>
      <Row>
      {/* Prima Colonna */}
      <Col className='colonnaMiles'>
        {['Health', 'Achievements'].map((type) => (
          <div key={type} className="milestone-type">
            <h2>{type}</h2>
            <div>
              {milestonesByType[type]?.map((milestone) => (
                <div key={milestone.ID} className={`milestone-item ${milestone.Achieved ? '' : 'not-achieved'}`}>
                  {milestone.Description} {getAchievedIcon(milestone)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Col>
      {/* Seconda Colonna */}
      <Col className='colonnaMiles2'>
        {['Money', 'Emotional Well-being'].map((type) => (
          <div key={type} className="milestone-type">
            <h2>{type}</h2>
            <div>
              {milestonesByType[type]?.map((milestone) => (
                <div key={milestone.ID} className={`milestone-item ${milestone.Achieved ? '' : 'not-achieved'}`}>
                  {milestone.Description} {getAchievedIcon(milestone)}
                </div>
              ))}
            </div>
          </div>
        ))}
        <Toast show={showToast} onClose={toggleToast} delay={3000} autohide bg="success">
          <Toast.Body>
            Milestone shared in the Community chat
          </Toast.Body>
        </Toast>
      </Col>
    </Row>
      {/* Modal per la condivisione */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{"Congratulations!"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You have achieved the milestone:</p>
            <p><b>{selectedMilestone.Description}</b></p>
            <p> Do you want to share it?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className='color-bottone-second' onClick={handleCloseModal}>
              Close
            </Button>
            <Button className='color-bottone' onClick={() => shareMilestone(selectedMilestone.Description)}>
            Share
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export { Milestone };
