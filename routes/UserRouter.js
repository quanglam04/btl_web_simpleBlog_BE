const express = require("express");
const User = require("../db/userModel");
const routerUser = express.Router();

//----------------------- api login
routerUser.post("/login", async (request, response) => {
  console.log("Request to /api/login: ", request.body);
  const user = await User.findOne({
    username: request.body.username,
    password: request.body.password,
  });
  if (user) {
    response.status(200).json(user);
    console.log("User found: ", user);
  } else {
    response.status(400).send({ error: "Invalid username or password" });
  }
});

module.exports = routerUser;
