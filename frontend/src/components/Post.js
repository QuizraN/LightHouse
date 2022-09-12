import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Post.css";
import Messages from "./Home/Messages";
import { Card, List, Spin } from "antd";
import { LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import "../components/Home/PostCard.css";
import { likeCheck, likesCount } from "../apis/LikesApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

function Post({ details }) {
  const queryClient = useQueryClient();
  //console.log("The details of the post are:",details.id)
  const {
    isLoading,
    isError,
    data: noOfLikes,
    error,
  } = useQuery(["likescount1", details.id], likesCount);

  // useEffect(() => {
  //   setCount(noOfLikes?.count);
  // }, [noOfLikes]);
  // if(isLoading)
  // {
  //   <Spin />
  // }

  const { data: likeCheckdata } = useQuery(
    ["likeCheck11", details.id],
    likeCheck
  );

  const likedata = useMutation(async (i) => {
    //console.log("use mutation for like",i)
    return await axios.post(
      `http://localhost:3001/apis/companies/users/posts`,
      i,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "", //(bearer + token) sending to backend
          //Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
        },
      }
    );
  });

  const unlikedata = useMutation(async (i) => {
    // console.log("use mutation for unnnnnnnnnlike",i)
    return await axios.delete(
      `http://localhost:3001/apis/companies/users/posts/unlike`,
      {
        data: i,
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "",
        },
      }
    );
  });

  const [input, setInput] = useState("");
  useEffect(() => {
    if (input) {
      setInput(input);
    }
  }, [input]);

  const [likes, setLikes] = useState(false);
  useEffect(() => {
    // console.log("Likes count", likesCount);
    if (likes) {
      setInput(likes);
    }
  }, [likes]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count) {
      setInput(count);
    }
  }, [count]);

  const [checkIfLiked, setcheckIfLiked] = useState(false);
  useEffect(() => {
    if (likeCheckdata) {
      setcheckIfLiked(checkIfLiked);
    }
  }, [likeCheckdata]);

  function handleLike() {
    setLikes(true);
    setCount(count + 1);
    //console.log("handling like")
    likedata.mutate(
      {
        postId: details.id,
      },
      {
        onSuccess: async () => {
          //alert("Successfully liked");
          //console.log("Posted data result", data);
          setInput("");
          await queryClient.refetchQueries();
        },
      }
    );
  }
  function handleUnlike() {
    setLikes(false);
    setCount(count - 1);
    //console.log("handling unlike")
    unlikedata.mutate(
      {
        postId: details.id,
      },
      {
        onSuccess: async () => {
          //alert("Successfully unliked");
          //console.log("Posted data result", data);
          setInput("");
          await queryClient.refetchQueries();
        },
      }
    );
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log("Message:", input);
  //   //db stuff here

  //   setInput("");
  // };
  // console.log("Data in post", details);
  return (
    <div className="postlist_body">
      <div className="post_specific_card">
        <Card
          title={
            <>
              <div className="postp">
                <div className="postp_top">
                  <Avatar
                    src={details.user.creatorImg}
                    style={{ fontSize: 20 }}
                  />
                  <div className="postp_info">
                    <h4>{details.user.name} </h4>
                    <h4>{details.createdAt}</h4>
                  </div>
                </div>
                <div className="postp_bottom">
                  <h3>{details.description}</h3>
                </div>
              </div>
            </>
          }
          style={{ width: "79%", margin: "auto", color: "#d2d2d2" }}
          hoverable={true}
        >
          <div className="postp_likes">
            <h4>{noOfLikes?.count} likes</h4>
            {/* {console.log("checking if liked or not",details.id,likeCheckdata)} */}
            {likeCheckdata ? (
              <LikeTwoTone
                title={noOfLikes?.name}
                style={{ fontSize: 17, marginLeft: 5 }}
                onClick={handleUnlike}
              />
            ) : (
              <LikeOutlined
                title={noOfLikes?.name}
                style={{ fontSize: 17, marginLeft: 5 }}
                onClick={handleLike}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Post;
