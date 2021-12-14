const notes = require("express").Router();
const { v4: uuidv4 } = require ("uuid");
const { readFromFile, readAndAppend, writeTofile } = require("../helpers/fsUtils")


notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  });


  notes.post("/", (req,res) => {
    console.log(req.body);
    
    const{ title, text } = req.body;

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

  module.exports = notes;