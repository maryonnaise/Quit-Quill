"use strict";

/* Data Access Object (DAO) module for accessing pages data */

const sqlite = require("sqlite3");
const db = new sqlite.Database("quitquill.db", (err) => {
  if (err) throw err;
});

exports.listMessagesExpert = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM ChatExpert ORDER BY id ASC;";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
};

exports.createMessageExpert = (message) => {
  console.log(message);
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO ChatExpert(sender,text,chatpassata,dottore) VALUES(?,?,?,?)";
    db.run(
      sql,
      [message.sender, message.text, message.chatpassata, message.dottore],
      function (err) {
        if (err) {
          reject(err);
        }
        console.log("eseguito");
        resolve({ message: "ok" });
      }
    );
  }).catch(() => "ERRORE!!");
};

exports.updateChatNuova = async (doctor) => {
  return new Promise(async (resolve, reject) => {
    const sql = "UPDATE ChatExpert SET chatpassata=1 WHERE dottore=?";

    db.run(sql, [doctor], function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes !== 1) {
        reject({ error: "No report was updated." });
      } else {
        resolve({ message: "ok" });
      }
    });
  });
};
