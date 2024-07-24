import dayjs from "dayjs";

const SERVER_URL = "http://localhost:3001/api/";

/**
 * A utility function for parsing the HTTP response.
 */
function getJson(httpResponsePromise) {
  // server API always return JSON, in case of error the format is the following { error: <message> }
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {
        if (response.ok) {
          // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
          response
            .json()
            .then((json) => resolve(json))
            .catch((err) => reject({ error: "Cannot parse server response" }));
        } else {
          // analyzing the cause of error
          response
            .json()
            .then((obj) => reject(obj)) // error msg in the response body
            .catch((err) => reject({ error: "Cannot parse server response" })); // something else
        }
      })
      .catch((err) => reject({ error: "Cannot communicate" })); // connection error
  });
}

/**
 * This function wants username and password inside a "credentials" object.
 * It executes the log-in.
 */
const logIn = async (credentials) => {
  return getJson(
    fetch(SERVER_URL + "sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // this parameter specifies that authentication cookie must be forwared
      body: JSON.stringify(credentials),
    })
  );
};

/**
 * This function is used to verify if the user is still logged-in.
 * It returns a JSON object with the user info.
 */
const getUserInfo = async () => {
  return getJson(
    fetch(SERVER_URL + "sessions/current", {
      // this parameter specifies that authentication cookie must be forwared
      credentials: "include",
    })
  );
};

/**
 * This function destroy the current user's session and execute the log-out.
 */
const logOut = async () => {
  return getJson(
    fetch(SERVER_URL + "sessions/current", {
      method: "DELETE",
      credentials: "include", // this parameter specifies that authentication cookie must be forwared
    })
  );
};

/**
 * This function retrieves the reservations for a user based on their ID.
 * It takes the user ID as a parameter and returns a JSON object with the user's reservations.
 */
const getChatMessage = async () => {
  return getJson(fetch(`${SERVER_URL}chat`));
};

const sendChatMessage = async (message) => {
  return getJson(
    fetch(`${SERVER_URL}chat/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
  );
};

const getChatExpert = async () => {
  return getJson(fetch(`${SERVER_URL}chatexpert`));
};

const sendChatExpert = async (message) => {
  console.log(message);
  return getJson(
    fetch(`${SERVER_URL}chatexpert/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
  );
};

const modifyExpertChat = async (doctor) => {
  return getJson(
    fetch(`${SERVER_URL}chatexpert/modify/${doctor}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
};

const getReports = async (booking) => {
  return getJson(fetch(`${SERVER_URL}reports`));
};

const sendReport = async (report) => {
  return getJson(
    fetch(`${SERVER_URL}report/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    })
  );
};

const deleteReport = async (reportid) => {
  return getJson(
    fetch(`${SERVER_URL}report/${reportid}`, {
      method: "DELETE",
    })
  );
};

const deleteChatMessage = async (messageId) => {
  return getJson(
    fetch(`${SERVER_URL}chat/${messageId}`, {
      method: "DELETE",
    })
  );
};

const fetchMilestones = async () => {
  return getJson(fetch(`${SERVER_URL}milestones`));
};

const fetchTime = async () => {
  return getJson(fetch(`${SERVER_URL}time`));
};

const modifyReport = async (report) => {
  return getJson(
    fetch(`${SERVER_URL}report/${report.ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(report),
    })
  );
};

const updateMilestone = async () => {
  return getJson(
    fetch(`${SERVER_URL}milestones/13`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
};

const API = {
  logIn,
  getUserInfo,
  logOut,
  getChatMessage,
  sendChatMessage,
  getReports,
  deleteReport,
  fetchMilestones,
  fetchTime,
  modifyReport,
  sendReport,
  getChatExpert,
  sendChatExpert,
  modifyExpertChat,
  deleteChatMessage,
  updateMilestone,
};
export default API;
