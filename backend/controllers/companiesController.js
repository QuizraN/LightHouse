const express = require("express");
const nodemailer = require("nodemailer");
const myrouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const { company, user, post, group, usergroups, likes } = new PrismaClient();

//1
const getAllPosts = async (req, res, next) => {
  console.log("Get All Posts request received", req.body);
  const email = req.user_email;
  var { groupName } = req.query;
  var { isGlobal } = req.query;
  console.log("Hello user", email);
  //console.log("Group Name is:",groupName)
  // var { cid } = req.params;
  var { isLiked } = req.query;
  //cid = parseInt(cid);
  //gid = parseInt(gid);
  //uid = parseInt(req.params.uid);

  //console.log(isLiked);
  //console.log("cid is:",cid,"gid is:",localgid);
  try {
    //get user_id using email
    const user_id = await user.findFirst({
      select: {
        id: true,
        companyId: true,
        name: true,
        creatorImg: true,
      },
      where: { email },
    });
    console.log("Hello userd_id", user_id);
    //postsIdArray=get all the posts posted by user_id belonging to company_id from likes table
    const posts = await likes.findMany({
      select: {
        postId: true,
      },
      where: { userId: user_id.id, companyId: user_id.companyId },
    });
    console.log(posts);
    const postsIdArray = posts.map((i) => {
      return i.postId;
    });
    const posts2 = await post.findMany({
      select: {
        id: true,
      },
      where: { creatorId: user_id.id },
    });
    console.log("Hello myposts:", posts2);
    const mypostsIdArray = posts2.map((i) => {
      return i.id;
    });
    console.log("Liked post id's are:", postsIdArray);
    console.log("Liked post id's are:", mypostsIdArray);
    if (isLiked === "true") {
      console.log("executing if");

      const likedPosts = await post.findMany({
        select: {
          id: true,
          creatorId: true,
          groupId: true,
          createdAt: true,
          description: true,
          user: {
            select: { name: true, creatorImg: true },
          },
        },
        where: {
          id: {
            in: postsIdArray,
          },
        },
        orderBy: { createdAt: "desc" },
      });
      //console.log(likedPosts);
      res.json(likedPosts);
    }
    if (isLiked === "false") {
      console.log("executing else......");

      console.log("postIdArray", mypostsIdArray);
      const myPosts = await post.findMany({
        select: {
          id: true,
          creatorId: true,
          groupId: true,
          createdAt: true,
          description: true,
          user: {
            select: { name: true, creatorImg: true },
          },
        },
        where: {
          creatorId: {
            in: mypostsIdArray,
          },
        },
        orderBy: { createdAt: "desc" },
      });
      console.log("Myposts are:", myPosts, user_id.id);
      res.json(myPosts);
    }
    //console.log("localgidl",localgid);
    if (groupName) {
      console.log("Group name present", groupName);
      const globalgid = await group.findFirst({
        select: { id: true },
        where: { companyId: user_id.companyId, name: groupName },
      });
      const postsss = await group.findMany({
        select: {
          posts: {
            select: {
              id: true,
              creatorId: true,
              groupId: true,
              createdAt: true,
              description: true,
              user: {
                select: { name: true, creatorImg: true },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
        where: { id: globalgid.id },
      });
      res.status(200).json(postsss);
    }
    console.log("no condition");
    const localgid = await group.findFirst({
      select: { id: true },
      where: { companyId: user_id.companyId, isGlobal: true },
    });
    const postsss = await group.findMany({
      select: {
        posts: {
          select: {
            id: true,
            creatorId: true,
            groupId: true,
            createdAt: true,
            description: true,
            user: {
              select: { name: true, creatorImg: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
      // posts:{
      // select:{
      //   user:true
      // }

      // posts: {
      //   orderBy: { createdAt: "desc" },
      // },
      where: { id: localgid.id },
    });
    console.log("hello", postsss[0].posts);
    res.status(200).json(postsss);
    next();
  } catch (err) {
    console.error(`Error while getting all posts`, err.message);
    next(err);
  }
};

//2
const getAllEmployees = async (req, res, next) => {
  console.log("getAllEmployees request received");
  console.log("Current user is:", req.user_email);
  var { groupName,nongroup } = req.query;
  try {
    console.log("request received for groupName:",groupName)
    console.log("request received for groupName:",nongroup)
    const user_id = await user.findFirst({
      where: { email: req.user_email },
    });
    // if(groupName)
    // {
      const group_id=await group.findFirst({
        select:{id:true,creatorId:true},
        where:{name:groupName},
      })
      const group_members_id=await usergroups.findMany({
        select:{userId:true},
        where:{groupId:group_id.id},
      })
      console.log("group_members_id:",group_members_id)
      const group_members_id_Array=group_members_id.map((i)=>{
        return i.userId
      })
      console.log("group_members_id_Array",group_members_id_Array)
      
        const group_members=await user.findMany({
        select:{name:true},
        where:{id:{
          in:group_members_id_Array
        }
      }
    });
    group_members_names_Array=group_members.map((i)=>{
      return i.name
    })
      console.log("Hello group members",group_members_names_Array)
       //group_members_names.push(group_members.name)
      //console.log("Hello group members",group_members_names)
      
    //   res.send(group_members)
    // }
    const companyname=await company.findFirst({
      select:{name:true},
      where:{id:user_id.companyId}
    })
    console.log("user id is:", user_id);
    console.log("company Name is:", companyname);
    //res.send("hello")
    const users = await user.findMany({
      where: {
        NOT: {
          id: user_id.id,
        },
        companyId: user_id.companyId,
      },
      include:{company:{select:{name:true}}
        }
    });
     const allNames=users.map((i)=>{
      return i.name
     })
     console.log("hello all users",allNames)


     const nonGroupNames=allNames.map((i)=>{
      //console.log("check",i)
      if(!(group_members_names_Array.includes(i)))
      {return i}
      return ""
     })
     const result=nonGroupNames.filter((i)=>{return i!=""})
     console.log("Non Group users are:",result)
     //allusers=users
     //group members=group_members_names_Array
     //non group members= result
     if(groupName && nongroup)
     {res.json(result)}
     if(groupName)
     {res.json(group_members_names_Array)}
    //console.log("hello non group users",result)
    res.json(users);
    next();
  } catch (err) {
    console.error(`Error while getting all employees`, err.message);
    next(err);
  }
};
//3
const getAllGroupPosts = async (req, res, next) => {
  console.log("request received", req.params);
  var { cid, gid } = req.params;
  cid = parseInt(cid);
  gid = parseInt(gid);
  try {
    const posts = await post.findMany({
      where: { groupId: gid },
    });
    res.json(posts);
    next();
  } catch (err) {
    console.error(`Error while getting posts`, err.message);
    next(err);
  }
};

//4
const getUserPosts = async (req, res, next) => {
  console.log("request received", req.params);
  var { cid, uid } = req.params;
  cid = parseInt(cid);
  uid = parseInt(uid);
  const isLiked = req.query.isLiked;
  try {
    if (isLiked) {
      const all_posts = await user.findMany({
        select: {
          likes: true,
        },
        where: { id: uid, companyId: cid },
      });
      res.send(all_posts);
    } else {
      const all_posts = await user.findMany({
        select: {
          posts: true,
        },
        where: { id: uid, companyId: cid },
      });
      res.send(all_posts);
    }
  } catch (err) {
    console.error(`Error while getting posts`, err.message);
    next(err);
  }
};

//5Done Completely
const createCompany = async (req, res, next) => {
  console.log("create company request received");
  const userName = req.user_name;
  const email = req.user_email;
  const image = req.user_img;
  console.log("hello", userName, email, image);
  try {
    const { name, users } = req.body;
    // console.log("Company name is:", name);
    //console.log("users of the company are:", users);

    //sending emails to the employees
    users.map((i) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "",
          pass: "",
        },
      });
      let mailOptions = {
        from: "quizraAdiba.16@gmail.com",
        to: i.email,
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
    });
    if (name) {
      const cid = await company.create({
        data: {
          name,
        },
        select: {
          id: true,
        },
      });
      console.log("New company is created", cid.id);
      //add and name email after firebase auth
      const uid = await user.create({
        data: {
          companyId: cid.id,
          isAdmin: true,
          email: email,
          creatorImg: image,
          name: userName,
        },
        select: {
          id: true,
        },
      });
      console.log("New User", uid.id);
      const new_group = await group.create({
        data: {
          creatorId: uid.id,
          companyId: cid.id,
          isGlobal: true,
          name,
        },
      });
      console.log("new_group", new_group);
      //create employees
      users.map(async (i) => {
        const users_id = await user.create({
          data: {
            companyId: cid.id,
            isAdmin: false,
            email: i.email,
          },
          select: {
            id: true,
          },
        });
      });
      res.json("Company is created with 1 admin");
    }
    //create employees adding employees to the user specific company
    const user_id = await user.findFirst({
      select: { id: true, companyId:true },
      where: { email },
    });

    users.map(async (i) => {
      const users_id = await user.create({
        data: {
          companyId: user_id.companyId,
          isAdmin: false,
          email: i.email,
          name:"NewEmployee",
        },
        select: {
          id: true,
        },
      });
    });

    res.json("Company is created with 1 admin");
  } catch (err) {
    console.error(`Error while creating company`, err.message);
    next(err);
  }
};

//5
//isglobal true=>create a post in global group
const createPost = async (req, res, next) => {
  console.log("create Post request received ", req.body);
  const email = req.user_email;
  const isGlobal = req.query.isGlobal;
  const { description, groupName } = req.body;
  //console.log("name is", creatorName);
  const cid = parseInt(req.params.cid);
  const uid = parseInt(req.params.uid);
  var gid = 0;
  try {
    const user_id = await user.findFirst({
      select: {
        id: true,
        companyId: true,
        name: true,
        creatorImg: true,
      },
      where: { email },
    });
    if (isGlobal == "true") {
      // console.log("Ckecking isGlobal:",isGlobal)
      gid = await group.findFirst({
        select: { id: true },
        where: { companyId: user_id.companyId, isGlobal: true },
      });
      console.log("True", gid);
    } else {
      // console.log("Ckecking isGlobal:",isGlobal)
      gid = await group.findFirst({
        select: { id: true },
        where: {
          companyId: user_id.companyId,
          isGlobal: false,
          name: groupName,
        },
      });
      console.log("False", gid);
    }
    const new_post = await post.create({
      data: {
        groupId: gid.id,
        creatorId: user_id.id,
        description,
      },
    });
    console.log("Post is created");
    res.send(new_post);
  } catch (err) {
    console.error(`Error while creating a group`, err.message);
    next(err);
  }
};

//6
const editProfile = async (req, res, next) => {
  console.log("editProfile request received");
  console.log("checking email", req.user_email);
  //res.send("hello")
  const cid = parseInt(req.params.cid);
  const uid = parseInt(req.params.uid);
  const { name, description, Hobbies, isAdmin, Userreqid } = req.body;
  console.log("description is:", description);
  console.log("Hobbies are:", Hobbies);

  try {
    const user_id = await user.findFirst({
      where: { email: req.user_email },
    });
    const adminstatus = await user.findFirst({
      select: { isAdmin: true },
      where: { email: req.user_email },
    });
    console.log(adminstatus);
    if (adminstatus.isAdmin && Userreqid) {
      const updated_user = await user.update({
        where: { id: parseInt(Userreqid) },
        data: {
          isAdmin,
        },
      });
      res.json(updated_user);
    }
    const updated_user = await user.update({
      where: { id: uid },
      data: {
        description,
        Hobbies,
      },
    });
    res.json(updated_user);
  } catch (err) {
    console.error(`Error while editing profile`, err.message);
    next(err);
  }
  console.log();
};

//7
const createLikedPost = async (req, res, next) => {
  console.log("create liked post req received", req.params);
  const cid = parseInt(req.params.cid);
  //const uid = parseInt(req.params.uid);
  const pid = parseInt(req.params.pid);
  const email = req.body.email;
  try {
    const uid = await user.findFirst({
      select: { id: true },
      where: { companyId: cid, email: email },
    });
    const new_like = await likes.create({
      data: {
        userId: uid.id,
        postId: pid,
        companyId: cid,
      },
    });
    res.json(new_like);
  } catch (err) {
    console.error(`Error while posting in likes table`, err.message);
    next(err);
  }

  console.log("created Liked post");
};

//8
const editCompanyName = async (req, res, next) => {
  console.log("editCompanyName request received",);
  const email=req.user_email;
  const {companyName} = req.body;
  try {
    const company_id = await user.findFirst({
      select: { companyId:true },
      where: { email },
    });
    const changedName = await company.update({
      where: { id:company_id.companyId },
      data: {
        name: companyName,
      },
    });
    console.log("changed Company Name", changedName);
    res.json(changedName);
  } catch (err) {
    console.error(`Error while editing group name`, err.message);
    next(err);
  }

  //res.send("hello")
};


module.exports = {
  getAllPosts,
  getAllEmployees,
  getAllGroupPosts,
  // getAllGroups,
  createCompany,
  createPost,
  // createGroup,
  editProfile,
  getUserPosts,
  apiInit,
  createLikedPost,
  // deleteGroup,
  // editGroup
  editCompanyName,
  // createGroupMembers,
  // checkGroupAdmin,
};
