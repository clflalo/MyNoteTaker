const notes = require("express").Router();
const { v4: uuidv4 } = require ("uuid");
const { readFromFile, readAndAppend, writeTofile } = require("../helpers/fsUtils")

notes.get("/", (req, res) => {
    readFromFile("./db/db.json")
    .then((data) => res.json(JSON.parse(data)));
  });


  notes.post("/", (req,res) => {
    console.log(req.body);
    
    const{title, text, id } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
            
        };

        readAndAppend(newNote, "./db/db.json");
        res.json("Note has been added")
    } else {
        res.error("Error adding note.")
    }

  });
 
  notes.delete("/:id", (req, res) => {
      const noteId = req.params.id;
      readFromFile("./db/db.json")
      .then((data) = JSON.parse(data))
      .then((json) => {
          const result = json.filter((note) => note.id !== noteId);
          console.log(noteId);
          

          writeTofile("'./db/db.json'", result);

          res.json(`${noteId} has been deleted`)
      });
  });

  module.exports = notes;
  
  
  