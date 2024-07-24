"use strict";

const dayjs = require("dayjs");
/* Data Access Object (DAO) module for accessing pages data */

const sqlite = require("sqlite3");
const db = new sqlite.Database("quitquill.db", (err) => {
  if (err) throw err;
});

exports.listMilestone = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Milestones ORDER BY ID ASC;";
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    });
  });
};

exports.updateMilestone = async () => {
  return new Promise(async (resolve, reject) => {
    const sql = "UPDATE Milestones SET Achieved=1 WHERE ID=13";

    db.run(
      sql,
      function (err) {
        if (err) {
          reject(err);
        }
        if (this.changes !== 1) {
          reject({ error: "No milestone was updated." });
        } else {
          resolve({ message: "ok" });
        }
      }
    );
  });
};