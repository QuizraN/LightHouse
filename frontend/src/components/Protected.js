import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { init } from "../apis/LoginApi";

const Protected = ({ children }) => {
    const {
        data,
        isLoading,
        isError,
        isFetched,
      } = useQuery(["unique-key-init"], init, {
      });
      if (isLoading) {
        <h1>Loading</h1>;
      }
      if (isError) {
        <h1>Error</h1>;
      }
 if (isFetched&&data.user==false) {
    console.log("Checking if the user is present in Protected",data?.user)
 return <Navigate to="/"/>;
 }
 return children;
};

export default Protected;