import axios from "axios";
export const getAllEmployees = async ({ queryKey }) => {
    console.log("getAllEmployees is getting called...");
    const { data } = await axios.get(
      `http://localhost:3001/apis/companies/1/users`,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "", 
          },
      }
    );
    //console.log("Employees data:", data);->working
    return data;
  };
export const getGroupEmployees = async ({ queryKey }) => {
    console.log("getAllEmployees is getting called...");
    const { data } = await axios.get(
      `http://localhost:3001/apis/companies/1/users`,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "", 
          },
      }
    );
    //console.log("Employees data:", data);->working
    return data;
  };
export const getnonGroupEmployees = async ({ queryKey }) => {
    console.log("getnonGroupEmployees is getting called...",queryKey[1]);
    const { data } = await axios.get(
      `http://localhost:3001/apis/companies/1/users?groupName=${queryKey[1]}&&nongroup=${true}`,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "", 
        },
      }
    );
    console.log("getnonGroupEmployees data:", data);
    return data;
  };
export const getAllGroups = async ({ queryKey }) => {
    console.log("getAllEmployees is getting called...");
    const { data } = await axios.get(
      `http://localhost:3001/apis/companies/1/groups`,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "", 
           },
      }
    );
    //console.log("Employees data:", data);->working
    return data;
  };
export const checkGroupAdmin = async ({ queryKey }) => {
    console.log("checkuserinGroup is getting called...",queryKey);
    const { data } = await axios.get(
      `http://localhost:3001/apis/companies/1/groups/admin/check?groupName=${queryKey[1]}`,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "", 
           },
      }
    );
    //console.log("checkuserinGroup data:", data);
    return data;
  };
export const getGroupByUser = async ({ queryKey }) => {
    console.log("getGroupByUser is getting called...");
    const { data } = await axios.get(
      `http://localhost:3001/apis/companies/1/groups/users`,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "", 
          },
      }
    );
    //console.log("getGroupByUser data:", data);
    return data;
  };