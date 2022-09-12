const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

router.post("/users/:uid/create", groupController.createGroup);
router.put("/members/create", groupController.createGroupMembers);
router.delete("/members/delete", groupController.deleteGroupMembers);
router.get("/", groupController.getAllGroups);
router.get("/users", groupController.getGroupByUser);
router.get("/admin/check", groupController.checkGroupAdmin);
router.delete("/delete", groupController.deleteGroup);
router.put("/edit", groupController.editGroup);

module.exports = router;


