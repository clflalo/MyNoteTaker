const notes = require('express').Router();
const { v4: uuidv4 } = require ('uuid');
const { readFromFile, readAndAppend, writeTofile } = require("../helpers/fsUtils")


notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
  });