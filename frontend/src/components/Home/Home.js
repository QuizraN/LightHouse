import React from "react";
import Confetti from "../Confetti";
import Post from "../Post";
import Messages from "./Messages";
import { PostCard } from "./PostCard";

function Home() {
  return (
    <>
      <Confetti />
      <PostCard />
      <Messages />
    </>
  );
}

export default Home;
