import React from "react";
import GroupMessages from "./GroupMessages";
import { GroupPostCard } from "./GroupPostCard";

function GroupHomePage() {
  return (
    <>
      <GroupPostCard />
      <GroupMessages />
    </>
  );
}

export default GroupHomePage;
