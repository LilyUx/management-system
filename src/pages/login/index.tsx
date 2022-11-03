import React from "react";
import { Form, Input, Button } from "antd";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import "./index.less";
import { IStoreState } from "../../store";
import { login } from "./service";

interface ILoginProps extends RouteComponentProps {
  isLogin: boolean;
  location: any;
  history: any;
}

function LoginPage(props: ILoginProps) {
  const dispatch = useDispatch();
  const { isLogin, location, history } = props;
  const { from = "/" } = location.state || {};

  const onFinish = (values: any) => {
    console.log(values);
    login(values).then((res: any) => {
      if (res && res.code === 0) {
        dispatch({ type: "LOGIN", payload: res.data });
        history.push("/home/index");
      }
    });
  };

  if (isLogin) {
    return <Redirect to={from} />;
  }

  return (
    <div className="login">
      <div className="login-container">
        <Form
          layout="vertical"
          name="basic"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default connect(({ user }: IStoreState) => ({ isLogin: user.isLogin }))(
  LoginPage
);
