const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { company, user, post, group, usergroups, likes } = new PrismaClient();

//create like

const createLike = async (req, res, next) => {
  console.log("create liked post req received", req.body.data);
  //console.log("Email",req.user_email)
  const email = req.user_email;
  const post_id = parseInt(req.body.postId);
  try {
    const user_id = await user.findFirst({
      select: { id: true, companyId: true },
      where: { email: email },
    });
    const new_like = await likes.create({
      data: {
        userId: user_id.id,
        postId: post_id,
        companyId: user_id.companyId,
      },
    });
    res.json(new_like);
  } catch (err) {
    console.error(`Error while posting in likes table`, err.message);
    next(err);
  }
  console.log("created Liked post");
};

//delete like
const deleteLike = async (req, res, next) => {
  console.log("deleteLike request received");
  const email = req.user_email;
  const post_id = parseInt(req.body.postId);
  try {
    const user_id = await user.findFirst({
      select: { id: true, companyId: true },
      where: { email: email },
    });
    const deleted_like = await likes.delete({
      where: {
        userId_postId_companyId: {
          userId: user_id.id,
          postId: post_id,
          companyId: user_id.companyId,
        },
      },
    });
    res.json(deleted_like);
  } catch (err) {
    console.error(`Error while posting in likes table`, err.message);
    next(err);
  }
  console.log("delete request completed!");
};

//get likes count
const likesCount = async (req, res, next) => {
  console.log("likesCount req received");
  //console.log("Email",req.user_email)
  const email = req.user_email;
  //console.log("req.queru.postId",req.query)
  const post_id = parseInt(req.query.postId);
  //console.log("Post id is:",post_id)
  console.log("Request received for post Id:", post_id);
  try {
    const user_id = await user.findFirst({
      select: { id: true, companyId: true },
      where: { email: req.user_email },
    });
    //console.log("user id is:",user_id);
    const like_count = await post.findMany({
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        user:{
            select:{name:true}
        }
      },
      where: {
        id: post_id,
      },
    });
    const like_users_id=await likes.findMany({
        select:{userId:true,
        },
        where:{postId:post_id},
        orderBy: { createdAt: "desc" },
    })
    const LikeduUserIdArray = like_users_id.map((i) => {
        return i.userId;
      });
      const likedUserNames=await user.findMany({
        select:{name:true},
        where: {
            id: {
              in: LikeduUserIdArray,
            },
          },
      })
     const abc=likedUserNames.map((i)=>{
        return i.name
      })
    //console.log("The ids of liked users:",abc)
 const like={"count":like_count[0]._count.likes,"name":abc}
 //console.log("Counted likes=>likes data is",like)
    //console.log("counted No of Likes",like_count[0].likes);
    //res.json(like_count[0]._count.likes);
    res.json(like);
  } catch (err) {
    console.error(`Error while counting likes for a post`, err.message);
    next(err);
  }
};

//checklike
const checkLike = async (req, res, next) => {
  console.log("checkLike req received");
  const email = req.user_email;
  //const post_id = req.query.post_Id;
  const post_id  = parseInt(req.query.postId);
  //console.log("Post id is:", req.query);
  console.log("Request received for post Id:",post_id);
  //res.status(200).send(post_id);
  try {
    const user_id = await user.findFirst({
      select: { id: true, companyId: true },
      where: { email: req.user_email },
    });
    console.log("post id is:",post_id);
    console.log("user id is:",user_id.id);
    const liked_user = await likes.findFirst({
        select:{id:true},
      where: {
        postId: post_id,
        userId:user_id.id
      },
    });
if(liked_user!==null)
{
    console.log("req received for user id:",user_id.id)
    res.json(1);
}
else{
    console.log("req received for user id:",user_id.id)
    res.json(0)
}
    console.log(liked_user);
   // res.json(liked_user);
  } catch (err) {
    console.error(`Error while counting likes for a post`, err.message);
    next(err);
  }
};

module.exports = {
  createLike,
  deleteLike,
  likesCount,
  checkLike,
};
