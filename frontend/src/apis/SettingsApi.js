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
  console.log("Employees data:", data);
  return data;
};
