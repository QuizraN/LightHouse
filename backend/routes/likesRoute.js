const express = require("express");
const router = express.Router();
const likesController = require("../controllers/likesController");

router.post("/users/posts", likesController.createLike);
router.delete("/users/posts", likesController.deleteLike); 
router.get("/users/posts", likesController.likesCount); 
router.get("/users/posts/check", likesController.checkLike); 
//router.get();

//http://localhost:3001/apis/companies/1/users/1/posts/3

module.exports = router;
