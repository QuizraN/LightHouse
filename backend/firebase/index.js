const firebase = require("firebase-admin");

const credentials = require("./credentials.json");

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "postgres://uegjvoybsaqdev:ce226efb6dd6687c39aeb5c3e2aa5956c8b20b87c6f0f9349b3a14c8aea43930@ec2-54-157-16-196.compute-1.amazonaws.com:5432/dctoqsq09d93sk",
});

module.exports = firebase;