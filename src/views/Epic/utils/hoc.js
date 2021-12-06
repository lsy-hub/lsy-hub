import React from "react";
import { Redirect, withRouter } from "react-router";
import request from "@/utils/request";

//调取localStorage中userInfo的数据
export function withUser(InnerComponent) {
  return function OuterComponent(props) {
    let userInfo = localStorage.getItem("userInfo");
    try {
      userInfo = JSON.parse(userInfo) || {};
    } catch (err) {
      userInfo = {};
    }
    return <InnerComponent userInfo={userInfo} {...props}></InnerComponent>;
  };

  return class OuterComponent extends React.Component {
    constructor() {
      super();
      this.state = {
        userInfo: {},
      };
    }
    componentDidMount() {
      let userInfo = localStorage.getItem("currentUser");
      try {
        userInfo = JSON.parse(userInfo) || {};
      } catch (err) {
        userInfo = {};
      }
      this.setState({
        userInfo,
      });
    }
    render() {
      const { userInfo } = this.state;
      return <InnerComponent userInfo={userInfo}></InnerComponent>;
    }
  };
}

////调取localStorage中多个key的数据
export function withStorage(...keys) {
  return function hoc(InnerComponent) {
    return function OuterComponent(props) {
      const data = {};
      keys.forEach((key) => {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value); //null
        } catch (err) {
          value = value;
        }
        data[key] = value;
      });

      //data[key]=value
      // props[key] = value;
      return <InnerComponent {...data} {...props}></InnerComponent>;
    };
  };
}

//路由跳转登陆验证
export function withAuth(InnerComponent) {
  class OuterComponent extends InnerComponent {
    componentDidMount() {
      super.componentDidMount();
    }
    render() {
      return this.props.userInfo.username ? (
        super.render()
      ) : (
        <Redirect to="/login" />
      );
    }
  }
  OuterComponent = withUser(OuterComponent);
  return OuterComponent;
}

//属性代理方式实现用户访问权限控制
export function withLogin(InnerComponent) {
  function OuterComponent(props) {
    //判断用户是否登陆
    if (props.userInfo.Authorization) {
      //校验token有效性
      request.get("/user/verify").then(({ data }) => {
        if (data.status === 401) {
          props.history.push({
            pathname: "/login",
            search: "targetUrl=" + props.location.pathname,
          });
        }
      });
      return <InnerComponent {...props}></InnerComponent>;
    } else {
      return <Redirect to="/login" />;
    }
  }
  OuterComponent = withUser(OuterComponent);
  OuterComponent = withRouter(OuterComponent);
  return OuterComponent;
}
