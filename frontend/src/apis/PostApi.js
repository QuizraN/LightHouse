import axios from "axios";

export const getAllPosts = async ({ queryKey }) => {
  console.log("getAllPosts is getting called...");
  const { data } = await axios.get(
    `http://localhost:3001/apis/companies/1/groups/1/users/1/posts`,
    {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "", 
        },
    }
  );
  //console.log("getAllPosts data:", data);
  return data;
};

export const getMyPosts = async ({ queryKey }) => {
  console.log("getMyPosts is getting called...");
  const { data } = await axios.get(
    `http://localhost:3001/apis/companies/1/groups/1/users/1/posts?isLiked=false`,
    {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "", 
        },
    }
  );
  console.log("getMyPosts:", data);
  return data;
};

export const getLikedPosts = async ({ queryKey }) => {
  console.log("getLikedPosts is getting called...");
  const { data } = await axios.get(
    `http://localhost:3001/apis/companies/1/groups/1/users/1/posts?isLiked=true`,
    {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "", 
        },
    }
  );
  console.log("getLikedPosts called");
  return data;
};

//Group

export const getGroupAllPosts = async ({ queryKey }) => {
  //const abc="Group8"
  console.log("getAllPosts is getting called...", queryKey[1].name);
  const { data } = await axios.get(
    `http://localhost:3001/apis/companies/1/groups/14/users/1/posts?groupName=${queryKey[1].name}`,
    {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "", 
         },
    }
  );
  //console.log("getAllGoupsPosts called data",data);
  return data;
};
