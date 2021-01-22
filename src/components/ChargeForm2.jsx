import React, { useState, useEffect } from "react";
import {
  Table,
  Tooltip,
  Button,
  Modal,
  InputNumber,
  message,
  Popconfirm,
} from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";

const ChargeForm = () => {
  const [charges, SetCharges] = useState([]);
  const [addedCharges, setAddedCharges] = useState([]);
  const [showQty, setShowQty] = useState(false);
  const [itemDescription, setItemDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [Id, setId] = useState("");
  const [itemIdToRemove, setItemIdToRemove] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const handleInitialValues = () => {
    SetCharges([
      {
        Id: "0001",
        Description: "CBC",
        Price: 150,
      },
      {
        Id: "0002",
        Description: "Fecalysis",
        Price: 250,
      },
      {
        Id: "0003",
        Description: "Albumin",
        Price: 100,
      },
    ]);
  };

  const handleSelect = (Id) => {
    setId(Id);
    const desc = charges.filter((s) => s.Id === Id);
    setItemDescription(desc[0].Description);
    setPrice(desc[0].Price);
    setShowQty(true);
  };

  const columns = [
    {
      title: "",
      dataIndex: "operation",
      width: 75,
      render: (text, record) =>
        charges.length >= 1 ? (
          <Tooltip title="Select">
            <Button
              type="primary"
              shape="circle"
              icon={<CheckOutlined />}
              onClick={() => handleSelect(record.Id)}
            />
          </Tooltip>
        ) : null,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
      sorter: (a, b) => a.Description.length - b.Description.length,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      width: 150,
      sorter: (a, b) => a.Price - b.Price,
      sortDirections: ["ascend", "descend"],
    },
  ];

  const columns2 = [
    {
      title: "",
      dataIndex: "operation",
      width: 75,
      render: (text, record) =>
        addedCharges.length >= 1 ? (
          <Popconfirm
            title="Remove this item?"
            onConfirm={handleRemoveItem}
            onCancel={handleCancelRemoveItem}
            okText="Yes"
            cancelText="No"
            key={record.Id}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={(e) => handleShowPopUpConfirm(record.Id)}
            />
          </Popconfirm>
        ) : null,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      width: 150,
      sorter: (a, b) => a.Description.length - b.Description.length,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
      width: 150,
      sorter: (a, b) => a.Price - b.Price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Qty",
      dataIndex: "Qty",
      key: "Quantity",
      width: 150,
      sorter: (a, b) => a.Price - b.Price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: 150,
      sorter: (a, b) => a.Price - b.Price,
      sortDirections: ["ascend", "descend"],
    },
  ];

  const handleAddItem = () => {
    if (price === null) {
      message.error("Price is required!");
      return false;
    } else if (price <= 0) {
      message.error("Price is required!");
      return false;
    } else if (qty === null) {
      message.error("Quantity is required!");
      return false;
    } else if (qty <= 0) {
      message.error("Quantity is required!");
      return false;
    }

    const f = addedCharges.filter((s) => s.Id === Id);
    if (f.length > 0) {
      message.error("Procedure already added!");
      return false;
    }

    const c = {
      Id: Id,
      Description: itemDescription,
      Price: price,
      Quantity: qty,
      Amount: price * qty,
    };

    setAddedCharges([...addedCharges, c]);
    setShowQty(false);
  };
  const handleShowPopUpConfirm = (id) => {
    setItemIdToRemove(id);
  };
  const handleCancelRemoveItem = () => {};
  const handleRemoveItem = () => {
    console.log(itemIdToRemove);
    const c = addedCharges.filter((f) => f.Id !== itemIdToRemove);
    setAddedCharges(c);
  };
  const handleCancelAddItem = () => {
    setShowQty(false);
  };
  useEffect(() => {
    handleInitialValues();
  }, []);

  useEffect(() => {
    var sum = 0;
    addedCharges.forEach((obj) => {
      sum += obj.Price * obj.Quantity;
    });

    setTotalAmount(sum.toFixed(2));
  }, [addedCharges]);
  return (
    <>
      <div className="text-2xl text-center font-bold">Charge Form</div>
      <div className="grid md:grid-cols-2 ">
        <div>
          <div className="text-lg font-bold text-center">Charges</div>
          <Table
            columns={columns}
            dataSource={charges}
            pagination={{ pageSize: 20 }}
            width="100%"
          />
        </div>
        <div>
          <div className="text-lg font-bold text-center">Added Charges</div>
          <Table
            columns={columns2}
            dataSource={addedCharges}
            pagination={false}
            width="100%"
          />
          <div className="text-lg font-semibold text-left">
            Total Amount:{totalAmount}
          </div>
        </div>
      </div>
      <Modal
        title="Add Charge"
        visible={showQty}
        onOk={handleAddItem}
        onCancel={handleCancelAddItem}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="font-semibold">Description</div>
          <div className="font-semibold">{itemDescription}</div>
          <div className="font-semibold">Price</div>
          <div className="font-semibold">
            <InputNumber value={price} onChange={(e) => setPrice(e)} />
          </div>
          <div className="font-semibold">Quantity</div>
          <div className="font-semibold">
            <InputNumber value={qty} onChange={(e) => setQty(e)} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChargeForm;
