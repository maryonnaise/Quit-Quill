"use strict";

const express = require("express");
const morgan = require("morgan"); // logging middleware
const cors = require("cors");

const chatDao = require("./dao-chat");
const reportDao = require("./dao-report");
const timeDao = require("./dao-time");
const milestoneDao = require("./dao-milestone");
const expertDao = require("./dao-expertchat");

// init express and set-up the middlewares ***/
const app = express();
const port = 3001;

app.use(morgan("dev"));
app.use(express.json());

/** Set up and enable Cross-Origin Resource Sharing (CORS) **/
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

/*** Page APIs ***/

// Retrieve the list of all the available pages.
// GET /api/pages

app.get("/api/chat", (req, res) => {
  chatDao
    .listMessages()
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(500).json(err)); // always return a json and an error message
});

app.get("/api/chatexpert", (req, res) => {
  expertDao
    .listMessagesExpert()
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(500).json(err)); // always return a json and an error message
});

//Create a new page, by providing all relevant information.
// POST /api/pages

app.post("/api/chat/add", async (req, res) => {
  const message = {
    text: req.body.text,
    sender: req.body.sender,
  };

  console.log(message);
  try {
    const result1 = await chatDao.createMessage(message);
    return res.status(201).json(result1);
  } catch (err) {
    res.status(500).json({
      error: `Database error during the creation of new message: ${err}`,
    });
  }
});

app.post("/api/chatexpert/add", async (req, res) => {
  const message = {
    text: req.body.text,
    sender: req.body.sender,
    chatpassata: req.body.chatpassata,
    dottore: req.body.dottore,
  };

  console.log(message);
  try {
    const result1 = await expertDao.createMessageExpert(message);
    return res.status(201).json(result1);
  } catch (err) {
    res.status(500).json({
      error: `Database error during the creation of new message: ${err}`,
    });
  }
});

app.put("/api/chatexpert/modify/:doctor", async (req, res) => {
  // Is the id in the body equal to the id in the url?

  try {
    const result1 = await expertDao.updateChatNuova(req.params.doctor);
    res.status(200).json(result1);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Database error during the update of a report: ${err}` });
  }
});

app.get("/api/time", (req, res) => {
  timeDao
    .getTime()
    .then((time) => res.status(200).json(time))
    .catch((err) => res.status(500).json(err)); // always return a json and an error message
});

app.get("/api/reports", (req, res) => {
  reportDao
    .listReports()
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(500).json(err)); // always return a json and an error message
});

app.post("/api/report/add", async (req, res) => {
  const report = {
    Mood: req.body.Mood,
    Smoked: req.body.Smoked,
    Feelings: req.body.Feelings,
  };

  try {
    const result1 = await reportDao.createReport(report);
    return res.status(201).json(result1);
  } catch (err) {
    res.status(500).json({
      error: `Database error during the creation of new report: ${err}`,
    });
  }
});

app.put("/api/report/:id", async (req, res) => {
  // Is the id in the body equal to the id in the url?
  if (req.body.ID !== Number(req.params.id)) {
    return res.status(422).json({ error: "URL and body id mismatch" });
  }

  const report = {
    id: req.params.id,
    mood: req.body.Mood,
    smoked: req.body.Smoked,
    feelings: req.body.Feelings,
  };

  try {
    const result1 = await reportDao.updateReport(report.id, report);
    res.status(200).json(result1);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Database error during the update of a report: ${err}` });
  }
});

app.get("/api/milestones", (req, res) => {
  milestoneDao
    .listMilestone()
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(500).json(err)); // always return a json and an error message
});

app.put("/api/milestones/:id", async (req, res) => {

  try {
    const result1 = await milestoneDao.updateMilestone();
    res.status(200).json(result1);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Database error during the update of a milestone: ${err}` });
  }
});

app.get("/api/time", (req, res) => {
  timeDao
    .getTime()
    .then((messages) => res.status(200).json(messages))
    .catch((err) => res.status(500).json(err)); // always return a json and an error message
});


app.delete('/api/report/:id', async (req, res) => {
  try {
    // Chiamata alla funzione deleteReport del modulo reportDao passando l'ID del report dalla richiesta
    const result = await reportDao.deleteReport(req.params.id);

    // Verifica se il report è stato eliminato con successo
    if (result == null) {
      return res.status(200).json({ message: "Report deleted successfully" }); // Restituisci un messaggio di successo
    } else {
      return res.status(404).json({ error: "No report was deleted." }); // Restituisci un errore se il report non è stato eliminato
    }
  } catch (err) {
    // Gestione degli errori durante la cancellazione del report
    res.status(500).json({ error: `Database error during the deletion of report ${req.params.id}: ${err}` });
  }
});

app.delete('/api/chat/:id', async (req, res) => {
  try {
    // Chiamata alla funzione deleteReport del modulo reportDao passando l'ID del report dalla richiesta
    const result = await chatDao.deleteMsg(req.params.id);

    // Verifica se il report è stato eliminato con successo
    if (result == null) {
      return res.status(200).json({ message: "messaggio deleted successfully" }); // Restituisci un messaggio di successo
    } else {
      return res.status(404).json({ error: "No report was deleted." }); // Restituisci un errore se il report non è stato eliminato
    }
  } catch (err) {
    // Gestione degli errori durante la cancellazione del report
    res.status(500).json({ error: `Database error during the deletion of report ${req.params.id}: ${err}` });
  }
});



/*

//Update a page, by providing all relevant information and the id.
// PUT /api/pages/<id>

app.put('/api/pages/:id',
  isLoggedIn,
  [
    check('title').isLength({min: 1, max:160}).withMessage("Title too long"),
    // only date (first ten chars) and valid ISO
    check('publicationDate').isLength({min: 10, max: 10}).isISO8601({strict: true}).optional({checkFalsy: true}).withMessage("Invalid Date"),
    check('creationDate').isLength({min: 10, max: 10}).isISO8601({strict: true}).withMessage("Invalid Date"),
    check("blocks").isArray().withMessage("Invalid blocks"),
    check("blocks.*").notEmpty().withMessage("Empty blocks"),
    check("blocks.*.content").isString().withMessage("Error in the content of blocks"),
    check("blocks.*.content").notEmpty().withMessage("Error in the content of blocks"),
    check("blocks.*.type").notEmpty().withMessage("Error in the content of blocks")
  ],
  async (req, res) => {

    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }); // error message is a single string with all error joined together
    }

    // Is the id in the body equal to the id in the url?
    if (req.body.id !== Number(req.params.id)) {
      return res.status(422).json({ error: 'URL and body id mismatch' });
    }

    const page = {
      id: req.params.id,
      title: req.body.title,
      author: req.body.author,
      creationDate: req.body.creationDate,
      publicationDate: req.body.publicationDate
    };

    const blocks = req.body.blocks

    let nHeaders = 0;
    let nOther = 0;
    let flagEmpty = 0;

    blocks.forEach((x) => {
      if(x.type === "Header"){
        nHeaders++;
      }else{
        nOther++;
      }

      if(x.type !== "Image" && x.content.trim() === ""){
        flagEmpty=1;
      }
    });

    if(flagEmpty){
      return res.status(422).json({error: "Error in content of blocks"})
    }


    if(nHeaders === 0 || (nHeaders !== 0 && nOther === 0)){
      return res.status(422).json({error: "Error in number of blocks"})
    }
    
    try {

      if(req.user.role!=="Admin"){
        const p = await pagesDao.getPage(req.params.id)
        if (p.error){
          return res.status(404).json(p);
        }else{
          if(p.author!==req.user.name){
            // if a normal user is trying to update a page but it's not the author of that page
            return res.status(401).json({error: 'Not authorized'});
          }
          if(req.body.author!==req.user.name){
            //if a user is trying to update the author of a page for who he is the author
            return res.status(401).json({error: 'Not authorized'});
          }
        }
      }

      const result1 = await pagesDao.updatePage(page.id,page); 
      await pagesDao.deletePageBlocks(page.id)

      let position = 1;
      blocks.forEach(async (block) => {
        block.pageid = page.id
        block.position = position
        position++
        const result2 = await pagesDao.createBlock(block)
      })
      res.status(200).json(result1);
    } catch (err) {
      res.status(500).json({ error: `Database error during the creation of new page: ${err}` }); 
    }
    
  }
);

// Delete an existing page, given its “id”
// DELETE /api/pages/<id>
// Given a page id, this route deletes the associated page from the list.

app.delete('/api/pages/:id',
  isLoggedIn,
  [ check('id').isInt({min: 1}).withMessage("Id is not an integer") ],
  async (req, res) => {

    const errors = validationResult(req).formatWith(errorFormatter); // format error message
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array().join(", ") }); // error message is a single string with all error joined together
    }
    
    try {

      if(req.user.role!=="Admin"){
        const p = await pagesDao.getPage(req.params.id)
        if (p.error){
          return res.status(404).json(p);
        }else{
          if(p.author!==req.user.name){
            return res.status(401).json({error: 'Not authorized'});
          }
        }
      }

      const result2 = await pagesDao.deletePageBlocks(req.params.id)
      if (result2 == null){
        const result = await pagesDao.deletePage(req.params.id);
        if(result == null){
          return res.status(200).json({}); 
        }else{
          return res.status(404).json(result);
        }
      }
      else
        return res.status(404).json(result2);
    } catch (err) {
      res.status(500).json({ error: `Database error during the deletion of page ${req.params.id}: ${err} ` });
    }
  }
);
*/

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
