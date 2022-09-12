import { Button, Form, Input, Space } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDetails } from "../../atoms/userAtom";

function EditProfile() {
  const queryClient = useQueryClient();
  const navigate=useNavigate();
  const [userInfo, setuserInfo] = useRecoilState(userDetails);
  useEffect(() => {
    console.log("after updating userDeatils is", userInfo);
  }, [userInfo]);

  const data = useMutation(async(i) => {
    return await axios.put(`http://localhost:3001/apis/companies/1/users/1`, i, {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "",
      },
    });
  });
  const onFinish = (values) => {
    data.mutate(
      {
        description: values.description,
        Hobbies: values.hobbies,
      },
      {
        onSuccess: async () => {
          setuserInfo(
           { ...userInfo,
            description: values.description,
            hobbies: values.hobbies,
           }
          );
          navigate("/profile")
        },
      }
    );
  };
  return (
    <>
      
      <div className="createCompany">
        <div className="form-details">
          <h1>Edit the profile</h1>
          <Form
            className="create__company"
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <h2>Submit Details</h2>
            <Form.Item label="Description" name="description">
              <Input
                placeholder="Add a description"
                required
                id="description"
                name="description"
              ></Input>
            </Form.Item>
            <Form.Item label="Hobbies" name="hobbies">
              <Input
                placeholder="Add hobbies"
                required
                id="hobbies"
                name="hobbies"
              ></Input>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
