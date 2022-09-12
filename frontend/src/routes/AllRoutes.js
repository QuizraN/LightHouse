import React from "react";
import { Route, Routes } from "react-router-dom";
import {Login} from "../components/Login";
import NotFound from "../components/NotFound";
import Home from "../components/Home/Home";
import Settings from "../components/Settings";
import CreateCompany from "../components/CreateCompany";
import Groups from "../components/Groups/Groups";
import Profile from "../components/Profile/Profile";
import AddGroups from "../components/Groups/AddGroups";
import GroupHomePage from "../components/Groups/GroupHomePage";
import EditProfile from "../components/Profile/EditProfile";
import Protected from "../components/Protected";
import AddEmployees from "../components/AddEmployees";
import AddGroupMembers from "../components/Groups/AddGroupMembers";


function AllRoutes() {
  return (
    <Routes className="route">
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<CreateCompany />} />
      <Route path="/home" element={<Protected><Home /></Protected>} />
      <Route path="/groups" element={<Protected><Groups /></Protected>} />
      <Route path="/settings" element={<Protected><Settings /></Protected>} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Protected><Profile /></Protected>} />
      <Route path="/addGroups" element={<Protected><AddGroups /></Protected>} />
      <Route path="/addEmployees" element={<Protected><AddEmployees /></Protected>} />
      <Route path="/groups/:name/:groupName" element={<Protected><AddGroupMembers /></Protected>} />
      <Route path="/editProfile" element={<Protected><EditProfile /></Protected>} />
      <Route path="/groups/:name" element={<Protected><GroupHomePage /></Protected>} />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AllRoutes;

