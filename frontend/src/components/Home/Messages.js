import { LikeOutlined } from "@ant-design/icons";
import { Avatar } from "@mui/material";
import { Card, List, Spin } from "antd";
import axios from "axios";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { likesCount } from "../../apis/LikesApi";
import { getAllPosts } from "../../apis/PostApi";
import { userDetails } from "../../atoms/userAtom";
import Post from "../Post";
import "./PostCard.css";

function Messages() {
  const queryClient = useQueryClient();
  const [userInfo, setuserInfo] = useRecoilState(userDetails);
  const { data, isLoading, isError, error } = useQuery(
    ["getAllposts1"],
    getAllPosts
  );
  //const {
  //  data: noOfLikes,
  //} = useQuery(["likescount1",details.id], likesCount);
  const {
    data: likesdata,
    mutate,
    isSuccess,
    isLoading: load,
    isError: err,
  } = useMutation(async (i) => {
    console.log("useMutation Called");
    return await axios.post(
      `http://localhost:3001/apis/companies/1/users/1/posts/5 `,
      i,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "",
        },
      }
    );
  });
  if (isLoading || load) {
    return <Spin />;
  }
  if (isError || err) {
    //console.log(error);
    return <h3 className="err" style={{color:"red"}}>No Posts created Yet</h3>;
  }
  if (isSuccess) {
    console.log("Succeessssssss", likesdata);
  }

  const handleClick = () => {
    console.log("Before Data in Postcard from useMutation :", likesdata);
    mutate(
      { email: userInfo.email },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries();
        },
      }
    );
    console.log(" After Data in Postcard from useMutation :", likesdata);
    console.log("useMutation has been called for posting likes"); //will give name of the company
  };

  console.log("hello Posted Data:", data[0].posts);
  return (
    <div className="postlist_body">
      <div className="post_specific_card">
        {data[0]?.posts?.map((i) => {
          return <Post details={i} />;
        })}
      </div>
    </div>
  );
}


export default Messages;
