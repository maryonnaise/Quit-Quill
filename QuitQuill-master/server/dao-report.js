"use strict";

const dayjs = require("dayjs");
/* Data Access Object (DAO) module for accessing pages data */

const sqlite = require("sqlite3");
const db = new sqlite.Database("quitquill.db", (err) => {
  if (err) throw err;
});

exports.listReports = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Reports ORDER BY ID ASC;";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
};

exports.createReport = (report) => {
  return new Promise((resolve, reject) => {
    const currentTime = dayjs().format("h:mm A");

    const sql =
      "INSERT INTO Reports(Mood, Smoked, Feelings, Time) VALUES(?,?,?,?)";
    db.run(
      sql,
      [report.Mood, report.Smoked, report.Feelings, currentTime],
      function (err) {
        if (err) {
          reject(err);
        }

        resolve({ message: "ok" });
      }
    );
  }).catch(() => "ERRORE!!");
};

exports.updateReport = async (id, report) => {
  return new Promise(async (resolve, reject) => {
    const sql = "UPDATE Reports SET Mood=?, Smoked=?, Feelings=? WHERE id=?";

    db.run(
      sql,
      [report.mood, report.smoked, report.feelings, id],
      function (err) {
        if (err) {
          reject(err);
        }
        if (this.changes !== 1) {
          reject({ error: "No report was updated." });
        } else {
          resolve({ message: "ok" });
        }
      }
    );
  });
};


/* exports.deleteReport = async (id) => {
  return new Promise(async (resolve, reject) => {
    const sql = "DELETE FROM Reports WHERE ID=?";
    
    console.log(id);

    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes !== 1) {
        reject({ error: "No report was deleted." });
      } else {
        resolve({ message: "Report deleted successfully." });
      }
    });
  });
}; */
exports.deleteReport = async (id) => {
  return new Promise(async (resolve, reject) => {
    // Verifica se esiste un report con l'ID specificato
    const reportExists = await getReportById(id); // Sostituire con la funzione che ottiene il report dal database per l'ID specificato

    // Se il report non esiste, restituisci un messaggio di errore
    if (!reportExists) {
      return reject({ error: "Report not found." });
    }

    const sql = "DELETE FROM Reports WHERE ID=?";
    
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes === 0) {
        reject({ error: "No report was deleted." });
      } else {
        resolve(null);
      }
    });
  });
};


const getReportById = async (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Reports WHERE ID=?";
    
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        // Se row è definito, significa che è stato trovato un report con quell'ID
        const reportExists = !!row;
        resolve(reportExists);
      }
    });
  });
};

