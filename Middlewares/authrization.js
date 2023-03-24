const express = require("express");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log(token, "middleware");
  if (token) {
    jwt.verify(token, "bruce", (err, decoded) => {
      if (decoded) {
        next();
      } else {
        res.send("wrong credentials");
      }
    });
  } else {
    res.send("err middleware");
  }
};

module.exports = { auth };
