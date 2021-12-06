import React, { useEffect } from "react";
// import { withUser } from "../utils/hoc";
// import { withRouter } from "react-router-dom";

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Upload,
  Rate,
  message,
} from "antd";

const { TextArea } = Input;
import axios from "axios";

function PublicFroms({ data, props }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  useEffect(() => {
    if (data?._id) {
      form.setFieldsValue({
        _id: data._id,
        title: data.title,
        author: data.author,
        date: data.date,
        short: data.short,
      });
    }
    if (!isEdit) {
      return;
    }
  }, [data]);

  //   const isEdit = true;

  const onFinish = function ({ _id, ...values }) {
    if (data?._id) {
      const data = axios.post("http://1.12.227.140:8081/news/update", {
        _id: _id,
        ...values,
      });
    } else {
      const { data } = axios.post("http://1.12.227.140:8081/news/add", {
        ...values,
      });
      props.history.push("/epic/news/list");
    }
  };

  //状态
  // if (isEdit) {
  // }

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 18,
      }}
      layout="horizontal"
      form={form}
      onFinish={onFinish}
    >
      <Form.Item label="_id" name="_id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="新闻标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="日期" name="date">
        <Input style={{ width: "250px" }} />
      </Form.Item>

      <Form.Item label="作者" name="author">
        <Input />
      </Form.Item>

      <Form.Item label="介绍" name="short">
        <TextArea rows={4} />
      </Form.Item>

      {/* <Form.Item label="详情-1" style={{ marginBottom: 0 }}>
        <Form.Item
          name="Subtitle"
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input placeholder="小标题" />
        </Form.Item>
        <Form.Item name="contents1">
          <TextArea rows={4} placeholder="介绍" />
        </Form.Item>
      </Form.Item>
      <Form.Item label="详情-2" style={{ marginBottom: 0 }}>
        <Form.Item
          name="Subtitles1"
          style={{ display: "inline-block", width: "calc(50% - 8px)" }}
        >
          <Input placeholder="小标题" />
        </Form.Item>
        <Form.Item name="contents2">
          <TextArea rows={4} placeholder="介绍" />
        </Form.Item>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 4,
        }}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PublicFroms;
