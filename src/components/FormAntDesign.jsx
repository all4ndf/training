import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Modal,
  message,
  Input,
  Select,
  Checkbox,
  DatePicker,
} from "antd";
const { Option } = Select;
const FormAntDesign = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("Ok");
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    console.log("Cancel");
  };

  const handleDisplayMessage = () => {
    message.warning("Warning");
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onChange = () => {};
  return (
    <>
      <h1>Form AntDesign</h1>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={6}>
          <Space direction="vertical">
            <DatePicker onChange={onChange} />
            <DatePicker onChange={onChange} picker="week" />
            <DatePicker onChange={onChange} picker="month" />
            <DatePicker onChange={onChange} picker="quarter" />
            <DatePicker onChange={onChange} picker="year" />
          </Space>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card
            title="Default size card"
            extra={<a href="#">More</a>}
            style={{ width: "100%", background: "#fae6ff" }}
            hoverable
          >
            <Space>
              <Button type="primary" onClick={handleShowModal}>
                Show Modal
              </Button>
              <Button onClick={handleDisplayMessage}>Display Message</Button>
              <Button type="dashed">Dashed Button</Button>
              <br />
              <Button type="text">Text Button</Button>
              <Button type="link">Link Button</Button>
            </Space>
          </Card>

          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Input placeholder="Basic usage" />

          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
          <Checkbox>Checkbox</Checkbox>
        </Col>
      </Row>
    </>
  );
};

export default FormAntDesign;
