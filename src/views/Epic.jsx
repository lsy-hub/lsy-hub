import React, { Component, useCallback, useEffect, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import {withLogin} from '@/utils/hoc'
import Home from "./Epic/Home";
import games from "./Epic/games/Default";
import News from "./Epic/News/Default";
import {
  ChromeFilled,
  HomeOutlined,
  ShopTwoTone,
  AppleOutlined,
  RocketTwoTone,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
//面包屑数据
const pathName = {
  "/epic": "首页",
  "/games": "游戏",
  "/list": "列表",
  "/add": "添加",
  "/news": "新闻",
  "/edit": "编辑",
};
//================================
function Epic(props) {
  const baseUrl = props.match.path;
  const changeMenu = useCallback(
    (e) => {
      props.history.push(e.key);
    },
    [props.location.pathname]
  );
  // const onSelect = function ({ item, key, keyPath, selectedKeys, domEvent }) {
  //   props.history.push(keyPath[0]);
  //   console.log(selectedKeys, domEvent);
  // };

  let [state, setState] = React.useState({
    menu: [
      {
        path: "/home",
        text: "首页",
        icon: <HomeOutlined />,
      },
      {
        path: "/games",
        text: "游戏管理",
        icon: <ShopTwoTone />,
        children: [
          {
            path: "/list",
            text: "游戏列表",
          },
          {
            path: "/add",
            text: "添加游戏",
          },
        ],
      },
      {
        path: "/news",
        text: "新闻管理",
        icon: <ChromeFilled />,
        children: [
          {
            path: "/list",
            text: "新闻列表",
          },
          {
            path: "/add",
            text: "添加新闻",
          },
        ],
      },
      {
        path: "/access",
        text: "权限管理",
        icon: <AppleOutlined />,
      },
    ],
    routess: [],
  });
  //面包屑渲染
  const newyemian = (location = props.location) => {
    const paths = location.pathname.split(/\b(?=\/)/);
    const routess = paths.map((item) => {
      return {
        path: item,
        breadcrumbName: pathName[item],
      };
    });
    setState({
      ...state,
      breadcrumb: paths,
      routess,
    });

    // onchange(state.slice());
  };
  useEffect(() => {
    newyemian();
  }, [changeMenu]);
  return (
    <Layout className="Layout" style={{ minHeight: "100vh" }}>
      <Sider className="site-layout-background" collapsible="false">
        <Menu theme="dark" mode="inline">
          <Menu.Item
            style={{ color: "#fff", fontSize: "22px" }}
            key="1"
            icon={<RocketTwoTone style={{ fontSize: "18px" }} />}
          >
            EPIC管理系统
          </Menu.Item>
        </Menu>

        {
          //列表名称
        }
        <Menu
          theme="dark"
          mode="inline"
          onClick={changeMenu}
          style={{ height: "100%", borderRight: 0 }}
        >
          {state.menu.map((item) => {
            if (item.children) {
              return (
                <SubMenu
                  key={baseUrl + item.path}
                  icon={item.icon}
                  title={item.text}
                >
                  {item.children.map((ite) => {
                    return (
                      <Menu.Item key={baseUrl + item.path + ite.path}>
                        {ite.text}
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item
                  key={baseUrl + item.path}
                  icon={item.icon}
                  title={item.text}
                >
                  {item.text}
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      {
        //面包屑
      }
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          {/* 面包屑导航组件 */}

          <Breadcrumb
            style={{ margin: "16px 0" }}
            routes={state.routess}
          ></Breadcrumb>
          {
            //路由跳转
          }
          <Switch>
            <Route path={baseUrl + "/home"} component={Home} />
            <Route path={baseUrl + "/games"} component={games} />
            <Route path={baseUrl + "/News"} component={News} />

            <Redirect from={baseUrl} to={baseUrl + "/home"} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

Epic = withLogin(Epic)

export default Epic;
