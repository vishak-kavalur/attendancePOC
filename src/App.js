import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Recognition from "./components/Recognition";
import Enrollment from "./components/Enrollment";
import Users from "./components/Users";


import "antd/dist/antd.css";
import './App.css';

import { Layout, Menu } from "antd";
import {
  UserAddOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content, Footer } = Layout;
const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Sider
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <div className="logo">
              <img src="/client_logo.png" style={{ width: '100%'}} alt="logo"/>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/recognition">
                  <VideoCameraOutlined />
                  <span>Recognition</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/enroll">
                  <UserAddOutlined />
                  <span>Enroll New User</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/users">
                  <UsergroupAddOutlined />
                  <span>All Users</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: "90 vh" }}
              >
                <Switch>
                  <Route path="/recognition">
                    <Recognition />
                  </Route>
                  <Route path="/enroll">
                    <Enrollment />
                  </Route>
                  <Route path="/users">
                    <Users />
                  </Route>
                </Switch>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
