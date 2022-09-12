import { LikeOutlined } from "@ant-design/icons";
import { Avatar } from "@mui/material";
import { Card, List, Spin } from "antd";
import axios from "axios";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { getGroupAllPosts } from "../../apis/PostApi";
import { userDetails } from "../../atoms/userAtom";
import "../Home/PostCard.css";
import Post from "../Post";

function GroupMessages() {
  const queryClient = useQueryClient();
  const groupName=useParams();
  //console.log("Hellllooooooooo",groupName.name)
  const [userInfo, setuserInfo] = useRecoilState(userDetails);
  const { data, isLoading, isError, error } = useQuery(
    ["getGroupAllPosts",groupName],
    getGroupAllPosts
  );
   const {data:likesdata,mutate,isSuccess,isLoading:load,isError:err} = useMutation(async(i) => {
    console.log("useMutation Called")
     return await axios.post(
       `http://localhost:3001/apis/companies/1/groups/1/users/1/posts/create`,i ,
       
     );
   });
  if (isLoading||load ) {
    return <Spin />;
  }
  if (isError||err ) {
    //console.log(error);
    return <h3 className="err">Error has occured in GroupMessage.js{error}{data}</h3>;
  }
  
  {
    console.log("Succeessssssss",data);
  }
  

  const handleClick = () => {
    console.log("Before Data in Postcard from useMutation :",likesdata)
    mutate(
      {email:userInfo.email},
      {
        onSuccess: async () => {
          await queryClient.refetchQueries();
        },
      }
    )
    console.log(" After Data in Postcard from useMutation :",likesdata)
    console.log("useMutation has been called for posting likes");//will give name of the company
  };
  
  // console.log("hello Posted Data:", data[0].posts);
  return (
    <div className="postlist_body">
      <div className="post_specific_card">
        {data[0].posts?.map((i) => {
          return <Post details={i}/>
        })}
      </div>
    </div>
  );
}

export default GroupMessages;

