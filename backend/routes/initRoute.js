const express = require("express");
const router = express.Router();
const initController = require("../controllers/initController");

router.get("/", initController.apiInit);
router.get("/send", initController.sendMail);
//router.get();

//http://localhost:3001/apis/companies/1/users/1/posts/3

module.exports = router;
