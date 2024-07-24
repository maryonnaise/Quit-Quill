import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

import { React, useState, useEffect } from "react";
import { Container, Toast } from "react-bootstrap/";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import {
  MainLayout,
  DefaultLayout,
  ExpertsLayout,
} from "./components/PageLayout";

import { Chatexpert } from "./components/ChatExpert";

import API from "./API";

function App() {
  const [message, setMessage] = useState("");
  const [posted,setpostedd]=useState(0);

  const setposted = () => {
    setpostedd(prev=>prev+1);
  };

  // If an error occurs, the error message will be shown in a toast.
  const handleErrors = (err) => {
    let msg = "";
    if (err.error) msg = err.error;
    else if (String(err) === "string") msg = String(err);
    else msg = "Unknown Error";
    setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
  };

  const filters = {
    home: { label: "Home", url: "/home" },
    milestones: { label: "Milestones", url: "/milestones" },
    calendar: { label: "Calendar", url: "/calendar" },
    askexperts: { label: "Need an expert?", url: "/askexperts" },
  };

  return (
    <BrowserRouter>
      <Container fluid className="App">
        <Navigation filters={filters} />

        <Routes>
          <Route path="/" element={<DefaultLayout filters={filters} posted={posted} setposted={setposted} />}>
            <Route index element={<MainLayout filters={filters} posted={posted} setposted={setposted}/>} />
            <Route
              path="/:filterLabel"
              element={<MainLayout filters={filters} posted={posted} setposted={setposted}/>}
            />
            
          </Route>
        </Routes>
        <Toast
          show={message !== ""}
          onClose={() => setMessage("")}
          delay={4000}
          autohide
          bg="danger"
        >
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </Container>
    </BrowserRouter>
  );
}

export default App;
