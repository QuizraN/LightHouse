import "./App.css";
import "./components/Home/Home.css";
import NavBar from "../src/components/NavBar";
import { Layout, Menu } from "antd";
import React, { useEffect } from "react";
import AllRoutes from "./routes/AllRoutes";

import { Route, Routes, useNavigate } from "react-router-dom";
import { user, userDetails } from "./atoms/userAtom";
import { useRecoilState } from "recoil";
import {
  HomeOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Login } from "./components/Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { init } from "./apis/LoginApi";
import { useQuery } from "react-query";
const { Header, Content, Footer, Sider } = Layout;

//const dummyuser = "quizra";
const App = () => {
  const navigate = useNavigate("");
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setuserInfo] = useRecoilState(userDetails);
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["initcall"],
    init
  );
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user in app.js onauthstatechanged", user);
        setuserInfo({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isAdmin: data?.isAdmin,
        });
      } else {
        console.log("No User", userInfo);
      }
    });
  }, [data]);
  return (
    <>
      {!userInfo.displayName ? (
        <Routes className="route">
          {console.log("Logged in User's Name:", userInfo.displayName)}
          <Route exact path="/" element={<Login />} />
        </Routes>
      ) : (
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div className="logo">Hello</div>
            <Menu
              // mode="inline"
              theme="dark"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  label: "Home",
                  key: "1",
                  icon: <HomeOutlined />,
                  onClick: () => {
                    navigate("/home");
                  },
                },
                {
                  label: "Groups",
                  key: "2",
                  icon: <UsergroupAddOutlined />,
                  onClick: () => {
                    navigate("/groups");
                  },
                },
                {
                  label: "Settings",
                  key: "3",
                  icon: <SettingOutlined />,
                  onClick: () => {
                    navigate("/settings");
                  },
                },
              ]}
            >
              {" "}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              style={{
                padding: 0,
                background: "#fff",
                marginBottom: 20,
              }}
            >
              <NavBar />
            </Header>
            <Content style={{}}>
              <AllRoutes />
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              LightHouse ©2022 Created by Quizra Nousheen
            </Footer>
          </Layout>
        </Layout>
      )}
    </>
  );
};

export default App;
