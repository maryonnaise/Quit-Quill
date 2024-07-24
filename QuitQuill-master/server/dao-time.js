'use strict';

/* Data Access Object (DAO) module for accessing pages data */

const sqlite = require('sqlite3');
const db = new sqlite.Database('quitquill.db', (err) => {
  if (err) throw err;

});

const dayjs = require("dayjs");

// MMMM D, YYYY h:mm A	August 16, 2018 8:02 PM

exports.getTime = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Time LIMIT 1;' // Limita la query per ottenere solo la prima riga
    db.get(sql,(err, row) => { // Utilizza db.get invece di db.all per ottenere solo la prima riga
      if (err) { reject(err); }
      resolve(row); // Restituisci solo la riga anziché l'intero array di righe
    });
  });
};