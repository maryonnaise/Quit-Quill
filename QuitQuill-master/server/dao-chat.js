"use strict";

/* Data Access Object (DAO) module for accessing pages data */

const sqlite = require("sqlite3");
const db = new sqlite.Database("quitquill.db", (err) => {
  if (err) throw err;
});

exports.listMessages = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Chat ORDER BY ID ASC;";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
};

exports.deleteMsg = async (id) => {
  return new Promise(async (resolve, reject) => {
    // Verifica se esiste un report con l'ID specificato

    const sql = "DELETE FROM Chat WHERE ID=?";
    
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes === 0) {
        reject({ error: "No message was deleted." });
      } else {
        resolve(null);
      }
    });
  });
};

exports.createMessage = (message) => {
  console.log(message);
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO Chat(Text,sender) VALUES(?,?)";
    db.run(sql, [message.text, message.sender], function (err) {
      if (err) {
        reject(err);
      }
      console.log("eseguito");
      resolve({message: "ok" });
    });
  }).catch(() => "ERRORE!!");
};
