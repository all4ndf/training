import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  Input,
  AutoComplete,
  Checkbox,
  InputNumber,
  Select,
  Button,
} from "antd";
const { Option } = Select;
const ItemProfile = () => {
  const [formItemProfile] = Form.useForm();
  const [dosageForm, setDosageForm] = useState([]);
  const [isForSale, setIsForSale] = useState(false);
  const [category, setCategory] = useState([]);
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
  const handleSubmitForm = (values) => {
    console.log(values);
    const valuesToSave = { ...values, ForSale: isForSale };
    console.log(valuesToSave);
  };

  const handleOnFinishFailed = () => {};

  const handleGetInitialValues = () => {
    setDosageForm([
      {
        value: "Tablet",
      },
      {
        value: "Capsule",
      },
      { value: "Vial" },
    ]);

    setCategory([
      {
        value: "0001",
        description: "Medicine",
      },
      {
        value: "0002",
        description: "Medical Supplies",
      },
      { value: "0003", description: "Janitorial Supplies" },
    ]);
  };
  const handleForSaleChange = (e) => {
    setIsForSale(e.target.checked);

    if (!e.target.checked) {
      formItemProfile.setFieldsValue({
        SellingPrice: undefined,
      });
    }
  };
  useEffect(() => {
    handleGetInitialValues();
  }, []);
  return (
    <div style={{ marginTop: 10 }}>
      <Row gutter={[12, 12]}>
        <Col sm={24} md={6}></Col>
        <Col sm={24} md={12}>
          <Card
            title="Item Profile"
            style={{ width: "100%", background: "#fae6ff" }}
            hoverable
          >
            <Form
              onFinish={handleSubmitForm}
              onFinishFailed={handleOnFinishFailed}
              form={formItemProfile}
              {...layout}
            >
              <Form.Item
                label="Item Code"
                name="ItemCode"
                rules={[
                  {
                    required: true,
                    message: "Please encode item code!",
                  },
                  {
                    max: 10,
                    message: "Lastname should be 10 char(s) only!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Brandname"
                name="BrandName"
                rules={[
                  {
                    required: true,
                    message: "Please input brandname!",
                  },
                  {
                    max: 100,
                    message: "Brandname should be 100 char(s) only!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Generic Name"
                name="GenericName"
                rules={[
                  {
                    required: true,
                    message: "Please input generic name!",
                  },
                  {
                    max: 100,
                    message: "Generic name should be 100 char(s) only!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Dosage Form"
                name="DosageForm"
                rules={[
                  {
                    required: true,
                    message: "Please input dosage form!",
                  },
                  {
                    max: 100,
                    message: "Dosage should be 100 char(s) only!",
                  },
                ]}
              >
                <AutoComplete
                  value="value"
                  options={dosageForm}
                  placeholder="Please select"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>

              <Form.Item label="Check if item is for sale" name="ForSale">
                <Checkbox onChange={handleForSaleChange} />
              </Form.Item>

              <Form.Item
                label="Selling Price"
                name="SellingPrice"
                rules={[
                  {
                    required: isForSale,
                    message: "Please encode selling price!",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="Category"
                name="Category"
                rules={[
                  {
                    required: true,
                    message: "Please select category!",
                  },
                ]}
              >
                <Select allowClear>
                  {category.map((d) => (
                    <Option key={d.value}>{d.description}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button loading={isSubmitting} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col sm={24} md={6}></Col>
      </Row>
    </div>
  );
};

export default ItemProfile;
