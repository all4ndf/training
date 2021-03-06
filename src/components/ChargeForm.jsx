import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Tooltip,
  Button,
  Modal,
  InputNumber,
  message,
  Popconfirm,
  Input,
  Space,
} from "antd";
import { CheckOutlined, DeleteOutlined } from "@ant-design/icons";
const ChargeForm = () => {
  const [listOfCharges, setListOfCharges] = useState([]);
  const [filteredCharges, setFilteredCharges] = useState([]);
  const [addedCharges, setAddedCharges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [qty, setQty] = useState(1);
  const [itemIdSelected, setItemIdSelected] = useState("");
  const [itemIdToBeRemoved, setItemIdToBeRemoved] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [ChargeSlipNo, setChargeSlipNo] = useState("");
  const [Id, setId] = useState("");
  const tableCol1 = [
    {
      title: "",
      dataIndex: "operation",
      width: 75,
      render: (text, record) =>
        listOfCharges.length >= 1 ? (
          <Tooltip title="Select">
            <Button
              type="primary"
              shape="circle"
              icon={<CheckOutlined />}
              onClick={() => handleSelect(record.ItemId)}
            />
          </Tooltip>
        ) : null,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
  ];

  const tableCol2 = [
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
          >
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => setItemIdToBeRemoved(record.ItemId)}
            />
          </Popconfirm>
        ) : null,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
    },
  ];
  const handleRemoveItem = () => {
    const newArray = addedCharges.filter((f) => f.ItemId !== itemIdToBeRemoved);
    setAddedCharges(newArray);
  };
  const handleCancelRemoveItem = () => {};
  const handleSelect = (itemId) => {
    const exist = addedCharges.filter((f) => f.ItemId === itemId);

    if (exist.length > 0) {
      message.error("Procedure already added!");
      return;
    }

    setItemIdSelected(itemId);
    const item = listOfCharges.filter((f) => f.ItemId === itemId);
    setDescription(item[0].Description);
    setQty(1);
    setPrice(item[0].Price);
    setShowModal(true);
  };
  useEffect(() => {
    setListOfCharges([
      {
        ItemId: "0001",
        Description: "CBC",
        Price: 100,
      },
      {
        ItemId: "0002",
        Description: "Fecalysis",
        Price: 120,
      },
      {
        ItemId: "0003",
        Description: "Albumin",
        Price: 200,
      },
      {
        ItemId: "0004",
        Description: "Urinalysis",
        Price: 50,
      },
    ]);
    setFilteredCharges(listOfCharges);
  }, []);
  const handleAddCharge = () => {
    //Test if qty and selling price are valid

    if (price === null) {
      message.error("Selling price is required!");
      return;
    } else if (price <= 0) {
      message.error("Selling price is required!");
      return;
    } else if (qty === null) {
      message.error("Quantity is required!");
      return;
    } else if (qty <= 0) {
      message.error("Quantity is required!");
      return;
    }

    const addedItem = {
      ItemId: itemIdSelected,
      Description: description,
      Price: price,
      Quantity: qty,
      Amount: price * qty,
    };

    setAddedCharges([...addedCharges, addedItem]);
    setShowModal(false);
  };
  const handleCancelAddCharge = () => {
    setShowModal(false);
  };

  useEffect(() => {
    var sum = 0;
    addedCharges.forEach((obj) => {
      sum += obj.Amount;
    });

    setTotalAmount(sum.toFixed(2));
  }, [addedCharges]);

  const handleChangeSearchStr = (e) => {
    setSearchStr(e.target.value);

    if (searchStr === "") {
      setFilteredCharges(listOfCharges);
      return;
    }

    const filteredData = listOfCharges.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key]
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase().trim())
      );
    });
    setFilteredCharges(filteredData);
  };

  const handlePrint = async () => {
    const isExcel = true;
    try {
      const response = await axios({
        url: "http://localhost:53017/api/downloadreport", //your url
        method: "GET",
        responseType: "blob", // important
        params: {
          reportName: "chargeslip2.rpt",
          param1: Id,
          isExcel: isExcel,
        },
      });

      if (response) {
        let newBlob;

        if (isExcel === false) {
          newBlob = new Blob([response.data], {
            type: "application/pdf",
          });
        } else {
          newBlob = new Blob([response.data], {
            type: "application/excel",
          });
        }

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        const data = window.URL.createObjectURL(newBlob);

        window.open(data, "_blank");
        setTimeout(function () {
          window.URL.revokeObjectURL(data);
        }, 100);
      }
    } catch (error) {
      return { Status: 0, Message: error.response.data.Message };
    }
  };

  const handleSaveCharge = async () => {
    if (addedCharges.length <= 0) {
      message.warning("Please encode charges to save!");
      return;
    }

    axios.defaults.baseURL = "http://localhost:53017/";

    const valuesToSave = {
      CaseNo: "21000001",
      DeptCode: "LAB",
      addedCharges: addedCharges,
    };

    try {
      const response = await axios.post("/api/savecharge", valuesToSave);

      if (response.data.stat === 1) {
        setChargeSlipNo(response.data.message);
        setId(response.data.param.Id);
        message.success("Successfully saved!");
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="font-semibold text-2xl text-center">Charge Form</div>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="border shadow-md p-2">
          <div className="text-center  font-semibold">List of Charges</div>
          <div>
            <Input
              value={searchStr}
              onChange={(value) => handleChangeSearchStr(value)}
            />
          </div>
          <div>
            <Table
              columns={tableCol1}
              dataSource={filteredCharges}
              pagination={false}
            />
          </div>
        </div>
        <div className="border shadow-md p-2">
          <div className="text-center  font-semibold">Added Charges</div>
          <div className="font-semibold mt-2">
            Charge Slip No:{ChargeSlipNo}
          </div>
          <div className="font-semibold mt-2">Id:{Id}</div>
          <Table
            columns={tableCol2}
            dataSource={addedCharges}
            pagination={false}
          />
          <div className="font-bold">Total Amount:{totalAmount}</div>
          <div>
            <Space>
              <Button type="primary" onClick={handleSaveCharge}>
                Save
              </Button>
              <Button type="primary" onClick={handlePrint}>
                Print
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <Modal
        title="Add Charge"
        visible={showModal}
        onOk={handleAddCharge}
        onCancel={handleCancelAddCharge}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="font-semibold">Description</div>
          <div className="font-semibold">{description}</div>
          <div className="font-semibold">Selling Price</div>
          <div className="font-semibold">
            <InputNumber value={price} onChange={(value) => setPrice(value)} />
          </div>
          <div className="font-semibold">Quantity</div>
          <div className="font-semibold">
            <InputNumber value={qty} onChange={(value) => setQty(value)} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChargeForm;
