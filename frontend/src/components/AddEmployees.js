import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import React from "react";
import "antd/dist/antd.css";
import "./CreateCompany.css";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";

//able to create company
//have to make changes
function AddEmployees(){
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const data = useMutation((i) => {
    return axios.post(`http://localhost:3001/apis/companies/create`, i, {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "",
      },
    });
  });
  const onFinish = (values) => {
    data.mutate({
      users: values.users,
    },{
        onSuccess:async()=>{
            await queryClient.refetchQueries();
        }
    })
    navigate("/settings");
  };

  return (
    <div className="createCompany">
      <div className="form-details">
        <h1>Add Employees</h1>
        <Form
          className="create__company"
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <h2>Employee Details</h2>
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "email"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Email",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Email" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddEmployees