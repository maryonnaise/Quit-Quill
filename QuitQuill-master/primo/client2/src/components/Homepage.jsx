import 'dayjs';

import { Modal, Table, Form, Button,Container,Row,Col, Toast } from 'react-bootstrap/'
import { FaEdit, FaTrash } from 'react-icons/fa';

import { Link, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import API from '../API';
const ReportsList = (props) => {
  //const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false); // Stato per controllare la visibilità del modal

  const handleReportUpdate = (updatedReport) => {
    API.modifyReport(updatedReport)
    
  };

  const handleOpenEditModal = (report) => {
    props.setSelectedReport(report);
    props.setshowHome(false);
    props.setshowForm(true);
  };

  const handleOpenDeleteModal = (report) => {
    props.setSelectedReport(report);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  const handleCloseEditModal = () => {
    setSelectedReport(null);
  };

  const deleteReport = async () => {
    await API.deleteReport(props.selectedReport.ID);
    setShowModal(false);
    props.setSelectedReport(null);
    props.toggleToast(2);
    props.cambiostato();
  }

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 0:
        return <span role="img" aria-label="sad face">😢</span>; // sad face
      case 1:
        return <span role="img" aria-label="neutral face">🙂</span>; // neutral face
      case 2:
        return <span role="img" aria-label="happy face">😊</span>; // happy face
      default:
        return <span role="img" aria-label="neutral face">🙂</span>; // Default to neutral face
    }
  };  

  return (
    <div>
     
      <ul>
        {props.reports.map((report) => (
          <Container className='repo-container' key={report.id}>
            <Row>
              <Col>
                <strong>Mood:</strong> {getMoodIcon(report.Mood)}
              </Col>
              <Col xs={3} className='text-right'>
                <Button className='delete-edit' onClick={() => handleOpenEditModal(report)}>
                  <FaEdit />
                </Button>
                <Button className='delete-edit' onClick={() => handleOpenDeleteModal(report)}>
                  <FaTrash />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong> {report.Smoked ? 'You were tempted to smoke' : 'You were not tempted to smoke'}</strong>
              </Col>
            </Row>
            <Row>
              <Col>
                <strong>Your Feelings:</strong> {report.Feelings}
              </Col>
              <Col xs={3} className='text-right'>
                {report.Time}
              </Col>
            </Row>
            {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{"Are you sure to delete the report?"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>If you press delete, the report will no longer be available</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className='color-bottone-second' onClick={handleCloseModal}>
              Close
            </Button>
            <Button className='color-bottone' onClick={deleteReport}>
            Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
          </Container>
        ))}
      </ul>
    </div>
  );
};

const Timer = (props) => {
  //const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0 });
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getTimeFromAPI = async () => {
      try {
        // Ottenere la data dal database utilizzando la funzione fetchtime
        const data = await API.fetchTime();
        console.log(data);
        const dateFromDB = new Date(data.Start);
        console.log(dateFromDB);

        const updateTimer = () => {
          // Calcolare la differenza tra la data ottenuta dall'API e la data attuale
          const currentDate = new Date();
          /*
          const differenceInMilliseconds = currentDate - dateFromDB;

          // Convertire la differenza in giorni, ore e minuti
          const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
          const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

          setTime({ days, hours, minutes });
          */

          const differenceInSeconds = Math.floor((currentDate - dateFromDB) / 1000);
          
          // Convertire la differenza in giorni, ore, minuti e secondi
          const days = Math.floor(differenceInSeconds / (24 * 3600));
          const hours = Math.floor((differenceInSeconds % (24 * 3600)) / 3600);
          const minutes = Math.floor((differenceInSeconds % 3600) / 60);
          const seconds = differenceInSeconds % 60;

          const newMoney = days * 5;

          // Aggiorna lo stato di money solo se il valore è cambiato
          if (newMoney !== props.money) {
            props.setMoney(newMoney);
          }


          setTime({ days, hours, minutes, seconds });
        };

        // Esegui l'aggiornamento del timer all'avvio
        updateTimer();

        // Avvia il timer per aggiornare il tempo ogni minuto
        //const intervalId = setInterval(updateTimer, 60000);
        const intervalId = setInterval(updateTimer, 1000);

        // Pulisci l'intervallo quando il componente viene smontato
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    getTimeFromAPI();
  }, []);

  return (
    <div>
      <p>{time.days} days</p>
      <p>{time.hours} hours</p>
      <p>{time.minutes} minutes</p>
      <p>{time.seconds} seconds</p>
    </div>
  );
};




function Homelayout(props) {
  
  const [money, setMoney] = useState(0);
  const [reports,setRepo]=useState([]);
  const [addedRepo,setaddedRepo]=useState(0);
  const [showHome, setshowHome] = useState(true);
  const [showForm, setshowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedReport, setSelectedReport] = useState(null);

  const [showToast, setShowToast] = useState(false);

  const [statoToast, setstatoToast] = useState(null);

  const toggleToast = (index) => {
    setstatoToast(index);
    setShowToast(!showToast);
  };

  const handleupdatereport = () => {
    setaddedRepo(prevAddedRepo=>prevAddedRepo + 1)
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const reportDB = await API.getReports();
        setRepo(reportDB);
      } catch (error) {
        console.error("Errore durante il recupero dei messaggi:", error);
      }
    };
    
    fetchData();
  }
    
    ,[addedRepo]);


  return (
    <Container>
      <Row className="mt-3">
        {showForm && (
            <Col>
              <Button className='color-bottone-second' onClick={() => {setShowModal(true)}}>Go Back</Button>
            </Col>
        )}
      </Row>
      {showHome && (
        <>
    <Row>
      <Col><b>Since you stopped:</b></Col>
      <Col><b>Money saved:</b></Col>
    </Row>
    <Row>
      <Col className='center-icon'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
</svg></Col>
      <Col className='bigger-text'><Timer money={money} setMoney={setMoney}></Timer></Col>
      <Col className='center-icon'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cash-coin" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
</svg></Col>
      <Col className='paddedtexttop'>{money} €</Col>
    </Row>
    <Row>
      <h2><em>Remember: You are doing this for your children</em></h2>
    </Row>
    <Row>
      <Col>
    <h3>Your day so far:</h3>
    </Col>
    <Col>
    <Toast show={showToast} onClose={toggleToast} delay={3000} autohide bg={statoToast === 2 ? "danger" :"success"}>
      <Toast.Body>
      {statoToast === 0 ? "Report modified successfully!" : statoToast === 1 ? "Report saved successfully!" : "Report deleted successfully"}      </Toast.Body>
    </Toast>
    </Col>
    </Row>
    <Row>
    <ReportsList setshowForm={setshowForm} setshowHome={setshowHome} reports={reports} cambiostato={handleupdatereport} setSelectedReport={setSelectedReport} selectedReport={selectedReport} toggleToast={toggleToast}/>
    </Row>
    <Row className="mt-3">
        <Col className="text-center">
            <Button
            className='color-bottone'
              variant="outline-primary"
              onClick={() => {setshowHome(false); setshowForm(true)}}
            >
              Track your day
            </Button>
        </Col>
      </Row>
      </>)}
      { showForm && (
        <>
        <Row className="text-center">
        <h1>How is your day going?</h1>
        </Row>
        <Row className="text-center">
        <MoodForm setshowHome={setshowHome} setshowForm={setshowForm} cambiostato={handleupdatereport} report={selectedReport} setSelectedReport={setSelectedReport} toggleToast={toggleToast}></MoodForm>
        </Row>
        </>
      )}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{"Are you sure to go back?"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>All the unsaved changes will be lost.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className='color-bottone-second'onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className='color-bottone' onClick={() => {setshowHome(true); setshowForm(false); setShowModal(false); setSelectedReport(null)}}>
             Go back
            </Button>
          </Modal.Footer>
        </Modal>
      )}
  </Container>
  );
}

const ErrorModal = ({ show, handleClose}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{"Some fields are missing!"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please fill all the fields in the form.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className='color-bottone' onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
  
const MoodForm = (props) => {
  const [mood, setMood] = useState(props.report ? props.report.Mood === 0 ? '0' : props.report.Mood === 1 ? '1' : props.report.Mood === 2 ? '2' : null : null);
  const [answer, setAnswer] = useState(props.report ? props.report.Smoked === 1 ? '1' : '0' : null);
  const [text, setText] = props.report ? useState(props.report.Feelings) : useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showModalSend, setShowModalSend] = useState(false);

  const handleCloseModal = () => {
    setShowModalSend(false);
  };

  const hanldeSave = () => {

    // Validazione dei campi
    if (!mood || !answer || !text) {
      setShowErrorModal(true);
      return; // Esce dalla funzione se i campi non sono stati compilati
    }

    setShowModalSend(true);
  }

  const handleSubmit =async (event) => {
    event.preventDefault();

    if (props.report){
      const newReport = {
        ID: props.report.ID,
        Mood: mood,
        Smoked: answer,
        Feelings: text    
      };

      await API.modifyReport(newReport);
      props.toggleToast(0); // Toggle the toast
      props.setSelectedReport(null);

    }else{
      const newReport = {
        Mood: mood,
        Smoked: answer,
        Feelings: text    
      };

      await API.sendReport(newReport);
      props.toggleToast(1); // Toggle the toast
    }

    setShowModalSend(false);
    setMood('');
    setAnswer('');
    setText('');

    props.setshowForm(false);
    props.setshowHome(true);
    props.cambiostato();

  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <br></br><br></br>
        <h3>What is your mood?</h3>
        <br></br>
        <div className="mood-buttons">
          <button
            type="button"
            className={`mood-button ${mood === '0' ? 'selected' : ''}`}
            onClick={() => setMood('0')}
          >
            😢
          </button>
          <button
            type="button"
            className={`mood-button ${mood === '1' ? 'selected' : ''}`}
            onClick={() => setMood('1')}
          >
            🙂
          </button>
          <button
            type="button"
            className={`mood-button ${mood === '2' ? 'selected' : ''}`}
            onClick={() => setMood('2')}
          >
            😊
          </button>
        </div>
      </div>
      <div>
      <br></br>
        <h3>Were you tempted to smoke?</h3>
        <br></br>
        <div className="radio-container">
        <label className="radio-label">
          <input
            className="radio-input"
            type="radio"
            value="1"
            checked={answer === '1'}
            onChange={(e) => setAnswer(e.target.value)}
          />
          Yes
        </label>
        <label className="radio-label">
          <input
            className="radio-input"
            type="radio"
            value="0"
            checked={answer === '0'}
            onChange={(e) => setAnswer(e.target.value)}
          />
          No
        </label>
      </div>
      </div>
      <div className="textarea-container">
        <br></br>
        <h3>Express your feelings</h3>
        <br></br>
        <textarea
          className="textarea-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <br></br>
      <Button
              className='color-bottone'
              onClick={hanldeSave}
            >
              Save
      </Button>
    </form>
    <ErrorModal
    show={showErrorModal}
    handleClose={() => setShowErrorModal(false)}
    />
    {showModalSend && (
      <Modal show={showModalSend} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{"Are you sure to save the report?"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The report will be modifiable in the home page.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='color-bottone-second' onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button className='color-bottone' onClick={handleSubmit}>
           Save
          </Button>
        </Modal.Footer>
      </Modal>
    )}
    </>
  );
};

export {Homelayout};
