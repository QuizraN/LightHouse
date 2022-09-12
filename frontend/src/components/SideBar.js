import React from "react";
import "./SideBar.css";
import Post from "./Post";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

function SideBar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar_in">
        <div className="sidebar_row">
          <div className="sidebar_icon">
            <HomeOutlinedIcon style={{ fontSize: 20 }} />
          </div>
          <Link className="link" to={"/home"}>
            Home
          </Link>
        </div>
        <div className="sidebar_row">
          <div className="sidebar_icon">
            <PeopleOutlineIcon style={{ fontSize: 20 }} />
          </div>
          <Link className="link" to={"/users"}>
            Groups
          </Link>
        </div>
        <div className="sidebar_row">
          <div className="sidebar_icon">
            <AdminPanelSettingsOutlinedIcon style={{ fontSize: 20 }} />
          </div>
          <Link className="link" to={"/settings"}>
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
