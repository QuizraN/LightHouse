const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { company, user, post, group, usergroups, likes } = new PrismaClient();

const apiInit = async (req, res, next) => {
  console.log("apiInit req received");
  const email = req.user_email;
  console.log("Hello user", email);
  //res.send("hello");
  try {
    var IndividualUser = await user.findFirst({
      select: { email: true, isAdmin: true },
      where: {
        email,
      },
    });
    IndividualUser = { ...IndividualUser, user: Boolean(IndividualUser) };
    //console.log("IndividualUser",IndividualUser)
    console.log("Init request served", IndividualUser);
    res.json(IndividualUser);
  } catch (err) {
    console.error(`Error in apiInit call`, err.message);
    next(err);
  }
};

const sendMail = async (req, res, next) => {
  console.log("sendMail req received");
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "quizraAdiba.16@gmail.com",
      pass: "srgmdpjrfuekpxrt",
    },
  });

  let mailOptions = {
    from: "quizraAdiba.16@gmail.com",
    to: "jadhavrushi3073@gmail.com",
    subject: "Invitation to LightHouse",
    text: "Intranet for Companies",
    html: '<h2 style="color:#ff6600;"> Welcome to <a href="http://localhost:3000/">LightHouse App!</a></h2>',
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("success");
  });
  res.send("hello");
};
module.exports = {
  apiInit,
  sendMail,
};
