import React, { useState, useEffect } from "react";
import {
  Col,
  Form,
  Row,
  Input,
  Button,
  Card,
  message,
  Select,
  AutoComplete,
} from "antd";
import axios from "axios";

const { Option } = Select;
const UserInformation = (props) => {
  const [formUserInformation] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Id, setId] = useState("");
  const [sex, setSex] = useState([]);
  const [occupations, setOccupations] = useState([]);
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

  const handleInitialValues = async () => {
    let response = await axios.get("http://localhost:53017/api/getsettings", {
      params: {
        code: "SEX",
      },
    });

    if (response) {
      setSex(response.data);
    }

    response = await axios.get("http://localhost:53017/api/getsettings", {
      params: {
        code: "OCC",
      },
    });

    if (response) {
      console.log(response.data);
      setOccupations(response.data);
    }
  };

  useEffect(() => {
    console.log(props);
    setId(props.location.state.Id);
    handleInitialValues();
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
                  label="Sex"
                  name="Sex"
                  rules={[
                    {
                      required: true,
                      message: "Required field!",
                    },
                  ]}
                >
                  <Select>
                    {sex.map((d) => (
                      <Option key={d.Value}>{d.Description}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Occupation" name="occupation">
                  <AutoComplete
                    value="Description"
                    options={occupations}
                    placeholder="Please select"
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    rules={[
                      {
                        required: false,
                        message: "Required field!",
                      },
                    ]}
                  />
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
