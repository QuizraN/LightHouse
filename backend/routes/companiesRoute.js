const express = require("express");
const router = express.Router();
const companiesController = require("../controllers/companiesController");

router.get("/", companiesController.apiInit);

//Home
router.post("/create", companiesController.createCompany);
router.post("/:cid/users/:uid/posts/create", companiesController.createPost);
router.get("/:cid/groups/:gid/users/:uid/posts",companiesController.getAllPosts);
router.put("/change",companiesController.editCompanyName);

//Groups
// router.post("/:cid/users/:uid/groups/create", companiesController.createGroup);
// router.put("/:cid/groups/members/create", companiesController.createGroupMembers);
// router.get("/:cid/groups", companiesController.getAllGroups);
// router.get("/groups/admin/check", companiesController.checkGroupAdmin);
// router.delete("/:cid/groups", companiesController.deleteGroup);
// router.put("/groups/edit", companiesController.editGroup);

//Profile
router.put("/:cid/users/:uid", companiesController.editProfile);
router.get("/:cid/users/:uid/posts", companiesController.getUserPosts);
router.post("/:cid/users/:uid/posts/:pid", companiesController.createLikedPost); //for posting uid and pid in likes table
router.get("/:cid/users", companiesController.getAllEmployees);
////router.post("/:cid/users",companiesController.createEmployee)

//router.put("/:cid/users/:uid", companiesController.updateAdmin);
////router.post("/groups/:id/posts/create",companiesController.createGroupPost)
//router.get("/:cid/groups/:gid/posts",companiesController.getAllGroupPosts)

////router.put("/users",companiesController.updateAdmin)
////router.post("/users",companiesController.createEmployee)

module.exports = router;

//debugging tips:
//check method if it is get|post|put
