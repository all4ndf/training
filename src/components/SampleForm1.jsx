import React from "react";
import { Row, Col, Card, Form, Input, DatePicker } from "antd";
import moment from "moment";
const SampleForm1 = (props) => {
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
            {/*           LastName
          FirstName
          MiddleName
          BirthDate */}

            <Form>
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
            </Form>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6}></Col>
      </Row>
    </>
  );
};

export default SampleForm1;
