const express = require("express");
const router = express.Router();
const bycryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Calling User Model
const { usermodel } = require("../models/users");

// GET
router.get(`/`, async (req, res) => {
  // Filter by Email
  let filter = {};
  if (req.query.email) {
    filter = { email: req.query.email };
  }
  const allUsers = await usermodel.find(filter).select("-passwordhash");

  if (!allUsers) {
    res.status(500).json({
      success: false,
      message: "There are no Users",
    });
  }
  res.status(200).send(allUsers);
});

// GET - Find by Id
router.get(`/:id`, async (req, res) => {
  const user = await usermodel.findById(req.params.id).select("-passwordhash");

  if (!user) {
    res.status(500).json({
      success: false,
      message: "The user could not be found",
    });
  }
  res.status(200).send(user);
});

// UPDATE
router.put(`/:id`, async (req, res) => {
  const updateUser = await usermodel.findByIdAndUpdate(
    req.params.id,
    {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      notification: req.body.notification,
      passwordhash: bycryptjs.hashSync(req.body.password, 10),
    },
    {
      new: true,
    }
  );

  if (!updateUser) {
    res.status(400).json({
      success: false,
      message: "The user could not be updated",
    });
  }
  res.status(200).send(updateUser);
});

// POST Login
router.post(`/login`, async (req, res) => {
  console.log("🚀 ~ file: users.js:127 ~ req.body", req.body);
  const user = await usermodel.findOne({ email: req.body.email });
  const userId = await usermodel.findOne({ id: req.body.id });
  const secret = process.env.SECRET;

  if (!user) {
    return res.status(400).send("User not found");
  }

  // Comparing password
  if (user && bycryptjs.compareSync(req.body.password, user.passwordhash)) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .send({ user: user.email, token: token, userId: userId.id });
    //return res.status(200).send('User authenticated');
  } else {
    return res.status(400).send("Password is wrong");
  }
});

// POST
router.post(`/`, (req, res) => {
  const newuser = new usermodel({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    notification: req.body.notification,
    passwordhash: bycryptjs.hashSync(req.body.password, 10),
  });

  newuser
    .save()
    .then((createuser) => {
      res.status(200).json(createuser);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  usermodel
    .findByIdAndRemove(req.params.id)
    .then((deleteuser) => {
      if (deleteuser) {
        return res.status(200).json({
          success: true,
          message: "The User was deleted.",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: err,
      });
    });
});

module.exports = router;
