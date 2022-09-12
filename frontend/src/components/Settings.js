import React, { useEffect, useState } from "react";
import {
  Button,
  Layout,
  Popconfirm,
  Space,
  Spin,
  Table,
  Tabs,
  Typography,
} from "antd";
import { getAllEmployees } from "../apis/GroupApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userDetails } from "../atoms/userAtom";
import "./Settings.css";
import "../components/Groups/Employees.css";
import { useNavigate } from "react-router";

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

function Users() {
  const queryClient = useQueryClient();
  const [companyName, setcompanyName] = useState("");
  useEffect(() => {}, [companyName]);

  const [userInfo] = useRecoilState(userDetails);

  //query to get all employees data
  const {
    data: employeesdata,
    isLoading,
    isError,
    isFetched,
  } = useQuery(["getAllemployeeskey"], getAllEmployees);

  //mutation to add|remove admin
  const mutation = useMutation((i) => {
    return axios.put(`http://localhost:3001/apis/companies/1/users/1`, i, {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "",
      },
    });
  });
  //mutation to change company name
  const companymutation = useMutation((i) => {
    return axios.put(`http://localhost:3001/apis/companies/change`, i, {
      headers: {
        Authorization: localStorage.getItem("google-token-popup-feature")
          ? "Bearer " + localStorage.getItem("google-token-popup-feature")
          : "",
      },
    });
  });

  if (isLoading) {
    <Spin />;
  }
  if (isError) {
    <Spin danger="true" />;
  }

  const handleRemove = (key) => {
    mutation.mutate(
      {
        isAdmin: false,
        Userreqid: key,
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries();
        },
      }
    );
    console.log("Removed Admin");
  };

  const handleAdd = (key) => {
    mutation.mutate(
      {
        isAdmin: true,
        Userreqid: key,
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries();
        },
      }
    );
    console.log("Added Admin");
    //navigate(`${key}`);
  };

  const columns1 = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span style={{ fontSize: 14 }}>{text}</span>,
    },

    {
      title: userInfo.isAdmin ? "Action" : "",
      key: "action",
      hoverable: true,
      render: (_, record, index) => (
        <Space size="middle">
          <Popconfirm
            title="Are you Sure?"
            onConfirm={() => {
              //console.log("clicked Id is:", record.id);
              {
                record.isAdmin === true
                  ? handleRemove(record.id)
                  : handleAdd(record.id);
              }
            }}
          >
            {userInfo.isAdmin ? (
              record.isAdmin === true ? (
                <a>Remove Admin</a>
              ) : (
                <a>Add Admin</a>
              )
            ) : (
              <div></div>
            )}
          </Popconfirm>
          {console.log(record.name, record.isAdmin)}
        </Space>
      ),
    },
  ];
  const navigate = useNavigate();
  //go to addEmployees screen
  function handleClick() {
    navigate("/addEmployees");
  }
  //to submit changed company name
  const onFinish = (values) => {
    companymutation.mutate(
      {
        companyName: values,
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries();
        },
      }
    );
  };

  return (
    <div className="employees">
      <div className="group_top">
        <h2>
          <Typography.Text
            editable={
              userInfo.isAdmin === true && {
                onChange: onFinish,
              }
            }
          >
            {employeesdata ? employeesdata[0].company.name : ""}
          </Typography.Text>
          {}
        </h2>
        {userInfo.isAdmin && (
          <Button onClick={handleClick} className="btn">
            Add Employee
          </Button>
        )}
      </div>
      <div className="group_bottom">
        <Tabs>
          <TabPane tab="Employees" key="1">
            <Table
              dataSource={employeesdata}
              columns={columns1}
              key={employeesdata}
              pagination={false}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default Users;
