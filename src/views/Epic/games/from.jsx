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
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
const { TextArea } = Input;
import axios from "axios";

function PublicFroms({ data, props }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  useEffect(() => {
    if (data?._id) {
      form.setFieldsValue({
        title: data.title,
        sales: data.price.sales,
        Issuedate: data.customAttributes.Issuedate,
        originalPrice: data.price.originalPrice,
        discountPrice: data.price.discountPrice,
        _id: data._id,
        describe: data.describe,
        image: data.images,
        introduce: data.introduce,

        // Subtitle: data.introduce[1].Subtitle
        //   ? data.introduce[1].Subtitle
        //   : "null",
        // Subtitles1: data.introduce[2].Subtitle
        //   ? data.introduce[2].Subtitle
        //   : "null",
        // contents1: data.introduce[1].content1
        //   ? data.introduce[1].content1
        //   : "null",
        // contents2: data.introduce[2].content1
        //   ? data.introduce[2].content2
        //   : "null",
      });
    }
    if (!isEdit) {
      return;
    }
  }, [data]);

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  //   const isEdit = true;

  const onFinish = function ({ _id, ...values }) {
    if (data?._id) {
      const data = axios.post("http://1.12.227.140:8081/goods/update", {
        _id: _id,
        ...values,
      });

      console.log(data);
      console.log("修改", data);
    } else {
      const { data } = axios.post("http://1.12.227.140:8081/goods/add", {
        ...values,
      });
      props.history.push("/epic/games/list");
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
      <Form.Item label="游戏名" name="title">
        <Input style={{ width: "300px" }} />
      </Form.Item>
      <Form.Item label="日期" name="Issuedate">
        <Input style={{ width: "250px" }} />
      </Form.Item>
      <Form.Item label="售价/元">
        <Form.Item label="原价" name="originalPrice">
          <InputNumber />
        </Form.Item>
        <Form.Item label="折扣价" name="discountPrice">
          <InputNumber />
        </Form.Item>
      </Form.Item>

      <Form.Item label="销量" name="sales">
        <InputNumber />
      </Form.Item>

      <Form.Item label="介绍" name="describe">
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
        name="image"
        label="图片"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="------------------------------------------------"
      >
        <Upload
          name="logo"
          action="http://1.12.227.140:8081/goods/add"
          listType="picture"
        >
          <Button icon={<UploadOutlined />}>上传图片</Button>
        </Upload>
      </Form.Item>

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
