const express = require("express");
const noteRouter = express.Router();
const { NoteModel } = require("../models/notes.model");
const jwt = require("jsonwebtoken");

noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "bruce");
  try {
    const decoded = jwt.verify(token, "bruce");
    if (decoded) {
      const notes = await NoteModel.find({ userID: decoded.userID });
      res.send({ msg: notes });
    } else {
      res.send("err get");
    }
  } catch (err) {
    res.send(err);
  }
});

noteRouter.post("/add", async (req, res) => {
  const payload = req.body;
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, "bruce");
    if (decoded) {
      //console.log(decoded);
      payload.userID = decoded.userID;
      const note = new NoteModel(payload);
      await note.save();
      res.send("note is created");
    } else {
      res.send("err post");
    }
  } catch (err) {
    res.send(err);
  }
});

noteRouter.patch("/update", async (req, res) => {
  const id = req.query.id;
  const payload = req.body;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "bruce");
  const note = await NoteModel.findOne({ _id: id });
  try {
    if (decoded && decoded.userID == note.userID) {
      await NoteModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("note is updated");
    } else {
      res.send("err patch");
    }
  } catch (err) {
    res.send(err);
  }
});

noteRouter.delete("/delete", async (req, res) => {
  const id = req.query.id;
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "bruce");
  const note = await NoteModel.findOne({ _id: id });

  try {
    if (decoded.userID == note.userID) {
      await NoteModel.findByIdAndDelete({ _id: id });
      res.send("note is deleted");
    } else {
      res.send("err delete");
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = { noteRouter };
