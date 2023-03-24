const express = require("express");
const { UserModel } = require("../models/user.models");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

userRouter.post("/register", async (req, res) => {
  const { email, password, location, age } = req.body;
  //console.log(req.body);

  //console.log(password);
  bcrypt.hash(password, 8, async (err, hash) => {
    // console.log(hash);
    if (hash) {
      //try {
      const user = new UserModel({ email, password: hash, location, age });
      await user.save();
      res.send({ msg: "User is created" });
      // } catch (err) {
      //  res.send("err");
      //}
    } else {
      res.send("something went wrong. please try again");
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    bcrypt.compare(password, user[0].password, (err, result) => {
      //console.log(result);
      if (result) {
        console.log(result);
        const token = jwt.sign({ userID: user[0]._id }, "bruce", {
          expiresIn: "1hr",
        });
        res.send({ msg: "logged in", token: token });
      } else {
        res.send("wrong credentials");
      }
    });
  } catch (err) {
    res.send("err");
  }
});

module.exports = { userRouter };
