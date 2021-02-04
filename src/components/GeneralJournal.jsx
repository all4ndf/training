/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Tooltip,
  Button,
  Modal,
  InputNumber,
  Checkbox,
  message,
  Space,
  Popconfirm,
} from "antd";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
const GeneralJournal = () => {
  const [listOfCoa, setListOfCoa] = useState([]);
  const [addedEntries, setAddedEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [accountCode, setAccountCode] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState(0);
  const [creditEntry, setCreditEntry] = useState(false);
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [editAccountCode, setEditAccountCode] = useState("");
  const tableCol1 = [
    {
      title: "",
      dataIndex: "operation",
      width: 75,
      render: (text, record) =>
        listOfCoa.length >= 1 ? (
          <Button
            type="primary"
            onClick={() => handleSelect(record.AccountCode)}
          >
            Select
          </Button>
        ) : null,
    },
    {
      title: "Account Code",
      dataIndex: "AccountCode",
      key: "AccountCode",
    },
    {
      title: "Account name",
      dataIndex: "AccountName",
      key: "AccountName",
    },
  ];

  const tableCol2 = [
    {
      title: "",
      dataIndex: "operation",
      width: 75,
      render: (text, record) =>
        addedEntries.length >= 1 ? (
          <div>
            <Space>
              <Button
                type="primary"
                onClick={() => handleEdit(record.AccountCode)}
              >
                Edit
              </Button>

              <Popconfirm
                title="Remove this item?"
                onConfirm={handleRemove}
                onCancel={() => setEditAccountCode("")}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  danger
                  type="primary"
                  onClick={() => setEditAccountCode(record.AccountCode)}
                >
                  Remove
                </Button>
              </Popconfirm>
            </Space>
          </div>
        ) : null,
    },
    {
      title: "Account Code",
      dataIndex: "AccountCode",
      key: "AccountCode",
    },
    {
      title: "Account name",
      dataIndex: "AccountName",
      key: "AccountName",
    },
    {
      title: "Debit",
      dataIndex: "Debit",
      key: "Debit",
    },
    {
      title: "Credit",
      dataIndex: "Credit",
      key: "Credit",
    },
  ];

  const handleRemove = () => {
    const newArray = addedEntries.filter(
      (f) => f.AccountCode !== editAccountCode
    );
    setAddedEntries(newArray);
    setEditAccountCode("");
  };
  const handleEdit = (e) => {
    setEditAccountCode(e);
    const x = addedEntries.filter((f) => f.AccountCode === e);
    setAccountCode(x[0].AccountCode);
    setAccountName(x[0].AccountName);
    setAmount(x[0].Debit + x[0].Credit);
    if (x[0].Credit > 0) {
      setCreditEntry(true);
    } else {
      setCreditEntry(false);
    }
    setShowModal(true);
  };

  const handleSelect = (e) => {
    const exist = addedEntries.filter((f) => f.AccountCode === e);

    if (exist.length > 0) {
      message.error("Account already added!");
      return;
    }

    const x = listOfCoa.filter((f) => f.AccountCode === e);

    setAccountCode(x[0].AccountCode);
    setAccountName(x[0].AccountName);
    setAmount(0);
    setCreditEntry(false);
    setShowModal(true);
  };
  const handleAddEntry = () => {
    if (amount === null) {
      message.error("Amount is required!");
      return;
    } else if (amount <= 0) {
      message.error("Amount must be greater than 0!");
      return;
    }

    if (editAccountCode === "") {
      const rowToBeAdded = {
        AccountCode: accountCode,
        AccountName: accountName,
        Debit: creditEntry ? 0 : amount,
        Credit: creditEntry ? amount : 0,
      };

      setAddedEntries([...addedEntries, rowToBeAdded]);
    } else {
      const f = (obj) => obj.AccountCode === editAccountCode;
      const index = addedEntries.findIndex(f);
      addedEntries[index].Debit = creditEntry ? 0 : amount;
      addedEntries[index].Credit = creditEntry ? amount : 0;
    }
    computeTotals();
    setEditAccountCode("");
    setShowModal(false);
  };
  const handleCancelAddEntry = () => {
    setShowModal(false);
  };

  const handleChangeCreditEntry = (e) => {
    setCreditEntry(e.target.checked);
  };
  useEffect(() => {
    setListOfCoa([
      {
        AccountCode: "1001",
        AccountName: "Cash on hand",
      },
      {
        AccountCode: "1002",
        AccountName: "A/R Patients",
      },
      {
        AccountCode: "4001",
        AccountName: "Medicine Income",
      },
      {
        AccountCode: "5001",
        AccountName: "Salaries and Wages",
      },
    ]);
  }, []);

  useEffect(() => {
    computeTotals();
  }, [addedEntries]);

  const computeTotals = () => {
    var totaldebit = 0;
    var totalcredit = 0;
    addedEntries.forEach((obj) => {
      totaldebit += obj.Debit;
      totalcredit += obj.Credit;
    });

    setTotalDebit(totaldebit.toFixed(2));
    setTotalCredit(totalcredit.toFixed(2));
  };

  const handleSaveGeneralJournal = async () => {
    if (addedEntries.length <= 0) {
      message.warning("Please add entries to save!");
      return;
    }

    console.log(addedEntries);

    axios.defaults.baseURL = "http://localhost:53017/";

    const valuesToSave = {
      sourceDoc: "GJ",
      journalEntries: addedEntries,
    };

    try {
      const response = await axios.post(
        "/api/savegeneraljournal",
        valuesToSave
      );
      if (response.data.stat === 1) {
        message.success(response.data.message);
      } else {
        message.warning(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="font-semibold text-2xl text-center">General Journal</div>
      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div className="border shadow-md p-2">
          <div className="text-center  font-semibold">Chart of accounts</div>

          <div>
            <Table
              columns={tableCol1}
              dataSource={listOfCoa}
              pagination={false}
            />
          </div>
        </div>
        <div className="border shadow-md p-2">
          <div className="text-center  font-semibold">Journal Entries</div>
          <div>
            <Table
              columns={tableCol2}
              dataSource={addedEntries}
              pagination={false}
            />
          </div>
          <div className="grid grid-cols-3">
            <div className="font-semibold">Totals </div>
            <div className="font-semibold">Debit:{totalDebit}</div>
            <div className="font-semibold">Credit:{totalCredit}</div>
          </div>
          <div className="flex  mt-2 ml-4">
            <Button type="primary" onClick={handleSaveGeneralJournal}>
              Save
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="Add Charge"
        visible={showModal}
        onOk={handleAddEntry}
        onCancel={handleCancelAddEntry}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="font-semibold">Account Code</div>
          <div className="font-semibold">{accountCode}</div>
          <div className="font-semibold">Account Name</div>
          <div className="font-semibold">{accountName}</div>

          <div className="font-semibold">Amount</div>
          <div className="font-semibold">
            <InputNumber
              value={amount}
              onChange={(value) => setAmount(value)}
            />
          </div>
          <div className="font-semibold">Check if credit entry?</div>
          <div className="font-semibold">
            <Checkbox
              checked={creditEntry}
              onChange={handleChangeCreditEntry}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GeneralJournal;
