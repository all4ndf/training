import React, { useState } from "react";
import { Col, Form, Row, Input, Button, Card, message } from "antd";
import axios from "axios";
const UserInformation = (props) => {
  const [formUserInformation] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 5,
      span: 19,
    },
  };
  const handleSubmitForm = async (values) => {
    console.log(values);

    axios.defaults.baseURL = "http://localhost:53017/";

    try {
      const response = await axios.post("/api/saveuserinformation", values);
      if (response.data.stat === 1) {
        message.success(response.data.message);
        props.history.push("/users");
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnFinishFailed = () => {};
  return (
    <>
      <div style={{ marginTop: 10 }}>
        <Row gutter={[12, 12]}>
          <Col sm={24} md={6}></Col>
          <Col sm={24} md={12}>
            <Card
              title="User Information"
              style={{ width: "100%", background: "#fae6ff" }}
              hoverable
            >
              <Form
                onFinish={handleSubmitForm}
                onFinishFailed={handleOnFinishFailed}
                form={formUserInformation}
                {...layout}
              >
                <Form.Item
                  label="Username"
                  name="Username"
                  rules={[
                    {
                      required: true,
                      message: "Username is required!",
                    },
                    {
                      max: 50,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Fullname"
                  name="Fullname"
                  rules={[
                    {
                      required: true,
                      message: "Fullname is required!",
                    },
                    {
                      max: 100,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email Address"
                  name="EmailAddress"
                  rules={[
                    {
                      max: 100,
                    },
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="MobileNo"
                  name="MobileNo"
                  rules={[
                    {
                      max: 50,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button
                    loading={isSubmitting}
                    type="primary"
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col sm={24} md={6}></Col>
        </Row>
      </div>
    </>
  );
};

export default UserInformation;
