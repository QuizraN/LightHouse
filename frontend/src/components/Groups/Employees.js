import React, { useState } from "react";
import { Button, Form, Spin, Tabs, Input } from "antd";
import { Space, Table } from "antd";
import "./Employees.css";
import { useNavigate } from "react-router";
import { getAllGroups, getGroupByUser } from "../../apis/GroupApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const { TabPane } = Tabs;

function Employees() {
  const [gname, setGname] = useState("");
  const queryClient = useQueryClient();
  const [editingRow, seteditingRow] = useState(false);
  const { data, isLoading, isError } = useQuery(["getAllGroups"], getAllGroups);
  const { data:settingsData, isLoading:load, isError:err } = useQuery(["getGroupByUser"], getGroupByUser);
  if (isLoading || load) {
    <Spin />;
  }
  if (isError || err) {
    <Spin danger="true" />;
  }

  const mutationedit = useMutation((i) => {
    return axios.put(`http://localhost:3001/apis/companies/1/groups/edit`, i, {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "",
      },
    });
  });

  const mutation = useMutation(async (i) => {
    return axios.delete(
      `http://localhost:3001/apis/companies/1/groups/delete`,
      {
        data: i,
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "",
        },
      }
    );
  });
  const handleDelete = (key) => {
    console.log("delete clicked", key);

    mutation.mutate(
      {
        name: key,
      },
      {
        onSuccess: async () => {
          await alert("Group Added");
          await queryClient.refetchQueries();
          navigate("/groups");
        },
      }
    );
  };
  const navigate = useNavigate();
  const handlePage = (key) => {
    console.log("handlepage is clicked", key);
    navigate(`${key}`);
  };

  function handleClick() {
    console.log("Clicked add Groups");
    navigate("/addGroups");
  }
  function handleEdit(key) {
    seteditingRow(key);
    console.log("Edit Groups clicked in Employees.js The Key is:", key);
  }
  const columns1 = [
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
      render: (text, index) => (
        <>
          <Space size="middle">
            <a
              onClick={() => {
                handlePage(index.name);
              }}
            >
              {text}
            </a>
          </Space>
        </>
      ),
    },
    {
      title: "Admin",
      dataIndex: "name",
      key: "Admin",
      render: (text, index,record) =>  index.user.name,
    },
  ];
  const columns2 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text, object, index) => index + 1
    },
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      render: (text, record, index) => {
        if (editingRow == true && record.name == gname) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please enter group name!",
                  placeholder: "please enter group name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <a>{text}</a>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, index, record) => (
        <>
          <EditOutlined
            onClick={() => {
              console.log(editingRow);
              setGname(index.name);
              seteditingRow(!editingRow); //use callback fn whenever we want to use previous value to set State
            }}
          />
          <Space size="large">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                handleDelete(index.name);
              }}
            >
              <DeleteOutlined style={{ color: "red", marginLeft: "12px" }} />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  const onFinish = (values) => {
    mutationedit.mutate(
      {
        name: gname,
        groupName: values.name,
      },
      {
        onSuccess: async () => {
          alert("GroupName Changed Successfully!");
          setGname(values.name);
          seteditingRow(!editingRow);
          await queryClient.refetchQueries();
        },
      }
    );

    console.log("On Finish is called:", values.name);
  };

  return (
    <div className="group_main">
      <div className="group_top">
        <h2>Groups</h2>
        <Button onClick={handleClick} className="btn">
          Add Group
        </Button>
      </div>
      <div className="group_bottom">
        <Tabs>
          <TabPane tab="Groups" key="1">
            <Table dataSource={data} columns={columns1} />
          </TabPane>
          <TabPane tab="Settings" key="2">
            <Form onFinish={onFinish}>
              <Table dataSource={settingsData} rowKey="employeeId" columns={columns2} />
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Employees;
