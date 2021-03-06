import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  DatePicker,
  Button,
  message,
  Select,
  AutoComplete,
  Radio,
  Upload,
} from "antd";

import moment from "moment";
const { TextArea } = Input;
const { Option } = Select;
const SampleForm1 = (props) => {
  const [formPatientInformation] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sex, setSex] = useState([]);
  const [religion, setReligion] = useState([]);
  const [isMiddleNameRequired, setIsMiddlenameRequired] = useState(false);
  const handleSubmitForm = async (values) => {
    setIsSubmitting(true);
    message.success("Valid form to be submitted!");
    console.log(values);

    setIsSubmitting(false);
  };

  const handleOnFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    message.error("Please check required fields!");
  };

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

  const handleGetPatientInformation = () => {
    //    function to get data from api

    const data = {
      LastName: "Fabular",
      FirstName: "Allan",
      MiddleName: "Delola",
      DateOfBirth: "12/12/1990",
      EmailAddress: "allan@comlogik.com",
    };

    formPatientInformation.setFieldsValue({
      LastName: data.LastName,
      FirstName: data.FirstName,
      MiddleName: data.MiddleName,
      DateOfBirth: moment(new Date(data.DateOfBirth), "MM/DD/yyyy"),
      EmailAddress: data.EmailAddress,
    });
  };

  const handleGetInitialValues = () => {
    setSex([
      {
        value: "M",
        description: "Male",
      },
      {
        value: "F",
        description: "Female",
      },
    ]);

    setReligion([
      {
        value: "Roman Catholic",
      },
      {
        value: "Born Again Christian",
      },
    ]);
  };

  const handleChangeSex = (value) => {
    console.log(value);
    if (value === "F") {
      setIsMiddlenameRequired(true);
    } else {
      setIsMiddlenameRequired(false);
    }
  };

  useEffect(() => {
    handleGetInitialValues();
    handleGetPatientInformation();
  }, []);

  return (
    <>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={6}></Col>
        <Col xs={24} sm={24} md={12}>
          <Card
            title="Patient Information"
            style={{ width: "100%", background: "#fae6ff" }}
            hoverable
          >
            <Form
              onFinish={handleSubmitForm}
              onFinishFailed={handleOnFinishFailed}
              form={formPatientInformation}
              {...layout}
            >
              <Form.Item
                label="Lastname"
                name="LastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname!",
                  },
                  {
                    max: 50,
                    message: "Lastname should be 50 char(s) only!",
                  },
                  {
                    min: 5,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Firstname"
                name="FirstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Middlename"
                name="MiddleName"
                rules={[
                  {
                    required: isMiddleNameRequired,
                  },
                  {
                    max: 50,
                    message: "Middlename must be 50 char(s) only!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Date of birth"
                name="DateOfBirth"
                rules={[
                  {
                    required: true,
                    message: "Date of birth is required!",
                  },
                ]}
              >
                <DatePicker
                  format={"MM/DD/yyyy"}
                  defaultValue={moment(new Date(), "MM/DD/yyyy")}
                />
              </Form.Item>

              <Form.Item
                label="Sex"
                name="Sex"
                rules={[
                  {
                    required: true,
                    message: "Sex is required!",
                  },
                ]}
              >
                <Select allowClear onChange={handleChangeSex}>
                  {sex.map((d) => (
                    <Option key={d.value}>{d.description}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Religion" name="Religion">
                <AutoComplete
                  value="value"
                  options={religion}
                  placeholder="Please select"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>

              <Form.Item label="Blood type" name="BloodType">
                <Radio.Group>
                  <Radio value={"A"}>A</Radio>
                  <Radio value={"O"}>O</Radio>
                  <Radio value={"O+"}>O+</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="EmailAddress"
                rules={[
                  {
                    required: true,
                    message: "Email address is required!",
                  },
                  {
                    type: "email",
                    message: "Invalid email address!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Remarks" name="Remarks">
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button loading={isSubmitting} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6}></Col>
      </Row>
    </>
  );
};

export default SampleForm1;
