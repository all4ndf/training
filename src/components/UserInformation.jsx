import React, { useState, useEffect } from "react";
import { Col, Form, Row, Input, Button, Card, message } from "antd";
import axios from "axios";
const UserInformation = (props) => {
  const [formUserInformation] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Id, setId] = useState("");
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

    const valuesToSave = { ...values, Id: Id };

    try {
      const response = await axios.post(
        "/api/saveuserinformation",
        valuesToSave
      );
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

  const handleGetUserDetails = async () => {
    axios.defaults.baseURL = "http://localhost:53017/";
    const response = await axios.get("/api/getuserdetails", {
      params: {
        Id: props.location.state.Id,
      },
    });

    if (response) {
      console.log(response);

      formUserInformation.setFieldsValue({
        Username: response.data.Username,
        Fullname: response.data.Fullname,
        EmailAddress: response.data.EmailAddress,
        MobileNo: response.data.MobileNo,
      });
    }
  };

  useEffect(() => {
    console.log(props);
    setId(props.location.state.Id);

    if (props.location.state.Id !== "") {
      handleGetUserDetails();
    }
  }, []);
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
                  <Input disabled={Id !== ""} />
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
