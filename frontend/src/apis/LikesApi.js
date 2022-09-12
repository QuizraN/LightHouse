import axios from "axios";
export const likesCount = async ({ queryKey }) => {
  //console.log("likesCount is getting called...",queryKey[1]);
  const { data } = await axios.get(
    `http://localhost:3001/apis/companies/users/posts?postId=${queryKey[1]}`,
    {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "",
      },
    }
  );
  //console.log("likesCount data:", data);
  return data;
};
export const likeCheck = async ({ queryKey }) => {
  //console.log("likeCheck called hello quey key...",queryKey);
  const { data } = await axios.get(
    `http://localhost:3001/apis/companies/users/posts/check?postId=${queryKey[1]}`,
    {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "",
      },
    }
  );
  //console.log("hello likecheck query",data)

  return data;
};
