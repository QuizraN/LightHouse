import { Button, Spin, Tabs } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { getLikedPosts, getMyPosts } from "../../apis/PostApi";
import { userDetails } from "../../atoms/userAtom";
import Post from "../Post";
import "./Profile.css";

const { TabPane } = Tabs;

function Profile() {
  const [userInfo] = useRecoilState(userDetails);
  // useEffect(()=>{

  // },[])

  console.log("user Details",userInfo)
  const {
    data: alldata,
    isLoading,
    isError,
    error,
  } = useQuery(["getMyposts"], getMyPosts);
  const {
    data: likeddata,
    isLoading: load,
    isError: err,
  } = useQuery(["getLikedPosts"], getLikedPosts);
  if (isLoading || load) {
    <Spin />;
  }
  if (isError || err) {
    <Spin danger="true" />;
  }
  const navigate = useNavigate();
  function handleClick() {
    console.log("Clicked Edit Profile");
    navigate("/editProfile");
  }

  return (
    <div className="profile">
      <div className="profile_image">
        <div className="profile_top"></div>
        <img className="avatar" src={userInfo.photoURL}></img>
      </div>
      <div className="profile_edit">
        <div className="profile_edit_top">
          <h1>Profile</h1>
          <Button onClick={handleClick} className="btn">
            Edit Profile
          </Button>
        </div>
        {console.log("lets check the user details",userInfo)}
        <div>{userInfo.displayName}</div>
        <div>{userInfo.description}</div>
        <div>{userInfo.hobbies}</div>
      </div>

      <div className="profile_bottom">
        <div className="group_bottom">
          <Tabs>
            <TabPane tab="My Posts" key="1">
              <div className="postlist_body">
                <div className="post_specific_card">
                  {console.log("hello all data", alldata)}
                  {alldata?.map((i) => {
                    return <Post details={i} />;
                  })}
                </div>
              </div>
            </TabPane>
            <TabPane tab="Liked Posts" key="2">
              <div className="postlist_body">
                <div className="post_specific_card">
                  {console.log("hello liked data", likeddata)}
                  {likeddata?.map((i) => {
                    return <Post details={i} />;
                  })}
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
        {/* myposts */}
        {/* likedposts */}
      </div>
    </div>
  );
}

export default Profile;
