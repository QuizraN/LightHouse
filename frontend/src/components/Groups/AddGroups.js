import React, { useEffect } from "react";
import { Select, Spin } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import "./AddGroups.css";
import { getAllEmployees } from "../../apis/GroupApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const { Option } = Select;

const children = [];

function AddGroups() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(
    ["getAllEmployees"],
    getAllEmployees
  );
  if (isLoading) {
    <Spin />;
  }
  if (isError) {
    <Spin danger="true" />;
  }
  const mutation = useMutation((i) => {
    return axios.post(
      `http://localhost:3001/apis/companies/1/groups/users/1/create`,
      i,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "",
        },
      }
    );
  });
  const onFinish = (values) => {
    values.EmployeesList = {};
    mutation.mutate(
      {
        groupName: values.groupName,
        EmployeeList: values.EmployeeList,
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries();
        },
      }
    );
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="groups">
      <div className="groupname">
        <h1 style={{ width: "75%", margin: "0 auto" }}>Add Group</h1>
        <div className="groupInfo">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Group Name"
              name="groupName"
              rules={[
                { required: true, message: "Please enter your Group Name!" },
              ]}
            >
              <Input values="hello" />
            </Form.Item>

            <Form.Item
              label="Employees List"
              name="EmployeeList"
              rules={[
                { required: true, message: "Please enter Group members!" },
              ]}
            >
              <Select
                mode="multiple"
                name="EmployeeList"
                style={{
                  width: "100%",
                }}
                allowClear
                maxTagCount={2}
                placeholder="Please select"
              >
                {data?.map((i) => {
                  return (
                    <Option key={i.name} values={i.name}>
                      {i.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddGroups;
