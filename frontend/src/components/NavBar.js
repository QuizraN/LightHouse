import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import "./NavBar.css";
import { userDetails } from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import { Avatar } from "antd";
import { Menu, Dropdown } from "antd";
import { ProfileOutlined, SettingOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router";
import { auth } from "../firebase";

function NavBar() {
  const [userInfo, setuserInfo] = useRecoilState(userDetails);
  // useEffect(()=>{
  // console.log("Clean up is done")
  // console.log("userInfo",userInfo)
  //   },[userInfo])
  //console.log("userInfo in NavBar", userInfo);
  const navigate = useNavigate("/login");

  const handleClick = () => {
    console.log("calling logout in NavBar");
    localStorage.clear();
    //window.sessionStorage.removeItem("google-token-popup-feature");
    auth.currentUser.delete();

    auth.signOut().then(console.log("Signout called!"));

    window.location.href = "/";
  };
  function handleProfile() {
    console.log("calling profile");
    navigate("/profile");
  }

  const userMenu = (
    <Menu>
      <Menu.Item key="1" onClick={handleProfile}>
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" danger="true" onClick={handleClick}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="main">
      <Avatar src={userInfo.photoURL} style={{ marginTop: 15, fontSize: 1 }} />
      <h3 className="username">{userInfo.displayName}</h3>
      <div>
        <Dropdown.Button
          style={{ marginTop: 15, marginLeft: 0 }}
          className="dropdown-btn"
          overlay={userMenu}
          icon={
            <ProfileOutlined
              style={{
                fontSize: "25px",
                backgroundColor: "#f0f0f0",
                borderRadius: "50%",
                border: "none",
              }}
            />
          }
        ></Dropdown.Button>
      </div>
    </div>
  );
}

export default NavBar;
