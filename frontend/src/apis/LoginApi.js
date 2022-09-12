import axios from "axios";

export const init = async ({ queryKey }) => {
    console.log("usequery is getting called...")
    const  {data}  = await axios.get(
      `http://localhost:3001/apis/init`,{
      headers: {
        Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",//(bearer + token) sending to backend
       }
    }
  );
  return data;
};