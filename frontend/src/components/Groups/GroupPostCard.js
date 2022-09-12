import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import "antd/dist/antd.css";
import "../Home/PostCard.css";

import { Avatar, Button, Card } from "antd";

import VideocamIcon from "@mui/icons-material/Videocam";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { userDetails } from "../../atoms/userAtom";
import { useRecoilState } from "recoil";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Spin } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { LikeOutlined } from "@ant-design/icons";
import { getAllPosts } from "../../apis/PostApi";
import Confetti from "../Confetti";
import { checkGroupAdmin } from "../../apis/GroupApi";

export const GroupPostCard = () => {
  const [userInfo, setuserInfo] = useRecoilState(userDetails);
  const groupName = useParams();
  console.log("The Group Name from useParams is:", groupName);
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();
  const { data,isLoading, isError,isFetched} = useQuery(
    ["checkGroupAdmin",groupName.name],
    checkGroupAdmin
  );
  if (isLoading) {
    <Spin />;
  }
  if (isError) {
    <Spin danger="true" />;
  }
  if(isFetched && data )
  {
    console.log("hello admin check value",data)
  }
  const mutation = useMutation((i) => {
    console.log("data in useMutation", i);
    return axios.post(
      `http://localhost:3001/apis/companies/1/users/1/posts/create?isGlobal=false`,
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
  console.log("Data in GroupPostcard from useMutation :", data);
  console.log("Display:", userInfo.displayName);
  const formik = useFormik({
    initialValues: {
      description: "",
      creatorname: "",
      creatorImg: "",
      groupName: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("Secret Message:", userInfo.displayName);
      mutation.mutate(
        {
          description: values.description,
          creatorName: userInfo.displayName,
          creatorImg: userInfo.photoURL,
          groupName: groupName.name,
        },
        {
          onSuccess: async () => {
            await alert("Successfully posted");
            console.log("Posted data result", data);
            resetForm({ values: "" });
            await queryClient.refetchQueries();
          },
        }
      );
    },
  });

  const CARD_COLOR_ACTIVE = "#d2d2d2";
  const ph = `What's on your mind, ${userInfo.displayName} ?`;
  const navigate = useNavigate();
  function handleClick() {
    console.log("Clicked add Groups Members",groupName.name);
    navigate(`${groupName.name}`);
  }
  return (
    <>
      <div className="postcard">
          <div className="post_head">Welcome {groupName.name}</div>
          
          <div>
            {

data?.check?(
  <Button onClick={handleClick} className="btn" style={{marginBottom:10}}>
  Add Group Members
</Button>
)
:<div></div>            }
            </div>
       
          
        <Card
          title={
            <>
              <div className="cards_list">
                <div className="post_top">
                  <Avatar src={userInfo.photoURL} />
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      id="description"
                      name="description"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      className="post_input"
                      type="text"
                      placeholder={ph}
                    />
                    <button type="submit">Submit</button>
                  </form>
                </div>
                <div className="post_bottom">
                  <div className="post_option">
                    <VideocamIcon style={{ color: "red" }} />
                    <h3>Live Video</h3>
                  </div>
                  <div className="post_option">
                    <PhotoLibraryIcon style={{ color: "green" }} />
                    <h3>Photo/Video</h3>
                  </div>
                  <div className="post_option">
                    <InsertEmoticonIcon style={{ color: "orange" }} />
                    <h3>Feeling/Activity</h3>
                  </div>
                </div>
              </div>
            </>
          }
          style={{ width: "75%", marginBottom: 10 }} // background: state ? "gray" : "transparent" }}
          hoverable={true}
          color={CARD_COLOR_ACTIVE}
        ></Card>
        {/* <Card
        size="small"
        title={
          <>
            <div className="postp">
              <div className="postp_top">
                <Avatar src={userInfo.photoURL} style={{fontSize:20}}/>
                <div className="postp_info">
                  <h4>Quizra {userInfo.displayName}</h4>
                  <h4>TimeStamp</h4>
                </div>
              </div>
              <div className="postp_bottom">
                <h3>Message</h3>
              </div>
              <div className="postp_likes">
                <h4>Count</h4>
                <LikeOutlined style={{fontSize:17,marginLeft:5}}/>
              </div>
            </div>
          </>
        }
        style={{ width: "75%", marginBottom: 10 }}
        hoverable={true}
        color={CARD_COLOR_ACTIVE}
      >
      </Card> */}
      </div>
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  margin: 30px;
  background: linear-gradient(to bottom, transparent, gray);
`;
