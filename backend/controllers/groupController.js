const express = require("express");
const nodemailer = require("nodemailer");
const myrouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const { company, user, post, group, usergroups, likes } = new PrismaClient();

//1
const createGroup = async (req, res, next) => {
  console.log("create group request received", req.body);
  const email = req.user_email;
  const { groupName, EmployeeList } = req.body;
  try {
    const userName = await user.findFirst({
      select: { name: true },
      where: {
        email,
      },
    });
    let abc = [...EmployeeList, userName.name];
    console.log(abc);
    //res.send("hello");
    const uid_list = await user.findMany({
      select: { id: true },
      where: {
        name: {
          in: abc,
        },
      },
    });
    //console.log(uid_list);
    const uidArray = uid_list.map((i) => {
      return i.id;
    });
    //console.log(uidArray)
    // console.log("hello users of the group",uidArray)

    const new_group = await group.create({
      select: { id: true },
      data: {
        creatorId: uid,
        companyId: cid,
        name: groupName,
        isGlobal: false,
      },
    });
    // const data=Array.from({length:2}).map((i)=>{
    //   userId:i,
    //   groupId:new_group.id,
    // })
    uidArray.map(async (i) => {
      const new_usergroup = await usergroups.create({
        data: {
          groupId: new_group.id,
          userId: i,
        },
      });
    });
    res.json(new_group);
  } catch (err) {
    console.error(`Error while creating a group`, err.message);
    next(err);
  }
  //console.log("Group1 created")
};

//2
const createGroupMembers = async (req, res, next) => {
  console.log("createGroupMembers request received");
  const email = req.user_email;
  const { groupName, EmployeeList } = req.body;
  try {
    //getting userid's based on employees names
    const uid_list = await user.findMany({
      select: { id: true },
      where: {
        name: {
          in: EmployeeList,
        },
      },
    });
    //console.log(uid_list); list of userid's to insert
    const uidArray = uid_list.map((i) => {
      return i.id;
    });

    const group_Id = await group.findFirst({
      select: { id: true },
      where: { name: groupName },
    });

    uidArray.map(async (i) => {
      console.log("UserId is", i, group_Id.id);
      const new_usergroup = await usergroups.create({
        data: {
          groupId: group_Id.id,
          userId: i,
        },
      });
    });
    res.json("Added Group Members");
  } catch (err) {
    console.error(`Error while adding members to the group`, err.message);
    next(err);
  }
  //console.log("Group1 created")
};
//3
const deleteGroupMembers = async (req, res, next) => {
  console.log("deleteGroupMembers request received");
  const email = req.user_email;
  const { groupName, EmployeeList } = req.body;
  try {
    //getting userid's based on employees names
    const uid_list = await user.findMany({
      select: { id: true },
      where: {
        name: {
          in: EmployeeList,
        },
      },
    });
    //console.log(uid_list); list of userid's to insert
    const uidArray = uid_list.map((i) => {
      return i.id;
    });

    const group_Id = await group.findFirst({
      select: { id: true },
      where: { name: groupName },
    });

    uidArray.map(async (i) => {
      console.log("UserId is", i, group_Id.id);
      const new_usergroup = await usergroups.delete({
        where: {
            OR: [
                {
                    groupId: group_Id.id,
                },
                {
                    userId: i,
                },
              ],
          
          
        },
      });
      
      console.log("Check ",new_usergroup)
    });
    res.json("Deleted Group Members");
  } catch (err) {
    console.error(`Error while deleting members from the group`, err.message);
    next(err);
  }
};

//4
const getAllGroups = async (req, res, next) => {
  console.log("get all groups request received");
  const email = req.user_email;
  console.log("Current user email is:", email);
  const cid = parseInt(req.params.cid);
  console.log(typeof cid);
  try {
    const user_id = await user.findFirst({
      select: { id: true,companyId:true },
      where: { email },
    });
    const groups_id = await usergroups.findMany({
      select: { groupId: true },
      where: { userId: user_id.id },
    });
    console.log("Groups id's are:", groups_id);
    const groupsIdArray = groups_id.map((i) => {
      return i.groupId;
    });
    console.log("Request received for:", groupsIdArray);
    const groupsList = await group.findMany({
      select: { name: true, id: true, creatorId: true,user:{
        select:{name:true}
      } },
      where: {
        companyId: user_id.companyId,
        isGlobal: false,
        id: {
          in: groupsIdArray,
        },
      },
    });
    console.log("groupsList", groupsList);
    res.json(groupsList);
    next();
  } catch (err) {
    console.error(`Error while getting all groups`, err.message);
    next(err);
  }
};

//5
const checkGroupAdmin = async (req, res, next) => {
  console.log("checkGroupAdmin request received");
  const email = req.user_email;
  const { groupName } = req.query;
  try {
    const currentUser = await user.findFirst({
      select: { id: true },
      where: { email },
    });
    const admin = await group.findFirst({
      select: { creatorId: true },
      where: { name: groupName },
    });
    console.log("CheckingAdmin", admin.creatorId, currentUser.id);
    if (admin.creatorId === currentUser.id) {
      console.log("trueeeeeee");
      res.json({ check: true });
    }

    res.json({ check: false });
  } catch (err) {
    console.error(`Error while group admin`, err.message);
    next(err);
  }

  //res.send("hello")
};

//6
const deleteGroup = async (req, res, next) => {
  console.log("deleteGroup request received", req);
  const cid = parseInt(req.params.cid);
  //res.send("hello");
  try {
    const deleted_group = await group.delete({
      where: { name: req.body.name },
    });
    res.json(deleted_group);
  } catch (err) {
    console.error(`Error while posting in likes table`, err.message);
    next(err);
  }

  console.log("delete request completed!");
};

//7
const editGroup = async (req, res, next) => {
  console.log("editGroup request received", req.body);
  const email = req.user_email;
  var name = "Group1";
  var { name, groupName } = req.body;
  try {
    const user_id = await user.findFirst({
      select: { id: true },
      where: { email },
    });
    const checkUser = await group.update({
      where: { name },
      data: {
        name: groupName,
      },
    });
    console.log("changed Group Name", checkUser);
    res.json(checkUser);
  } catch (err) {
    console.error(`Error while editing group name`, err.message);
    next(err);
  }
  //res.send("hello")
};

//8
const getGroupByUser = async (req, res, next) => {
  console.log("getGroupByAdmin request received");
  const email = req.user_email;
  console.log("Current user email is:", email);
  try {
    const user_id = await user.findFirst({
      select: { id: true,companyId:true },
      where: { email },
    });
    const groupsList = await group.findMany({
      select: { id:true,name: true},
      where: {
        creatorId:user_id.id,
            NOT: {
              id: 1,
            }
      },
    });
    console.log("groupsList", groupsList);
    res.json(groupsList);
    next();
  } catch (err) {
    console.error(`Error while getting groups based on admin`, err.message);
    next(err);
  }
};

module.exports = {
  getAllGroups,
  createGroup,
  deleteGroup,
  editGroup,
  createGroupMembers,
  checkGroupAdmin,
  getGroupByUser,
  deleteGroupMembers
};
