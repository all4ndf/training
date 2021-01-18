/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card, Row, Col, Button, Space, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">1st menu item</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">2nd menu item</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

const Form3 = (props) => {
  return (
    <>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={6}>
          Column 1
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Card
            title="Login"
            style={{
              width: "100%",
              alignItems: "center",
              background: "#fae6ff",
            }}
          >
            <Row gutter={[12, 12]}>
              <Col>
                <Space>
                  <Button type="primary">Primary Button</Button>
                  <Button>Default Button</Button>
                  <Button type="dashed">Dashed Button</Button>
                  <br />
                  <Button type="text">Text Button</Button>
                  <Button type="link">Link Button</Button>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    Click me <DownOutlined />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={6}>
          Column 3
        </Col>
      </Row>
    </>
  );
};

export default Form3;
