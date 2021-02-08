/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Input, Space } from "antd";
const Users = (props) => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const handleNew = () => {
    //props.history.push("/userinformation");

    props.history.push({
      pathname: "/userinformation",
      state: {
        Id: "",
      },
    });
  };

  const editUser = (Id) => {
    console.log(Id);

    props.history.push({
      pathname: "/userinformation",
      state: {
        Id: Id,
      },
    });
  };
  const tableUsers = [
    {
      title: "",
      dataIndex: "operation",
      width: 75,
      render: (text, record) =>
        listOfUsers.length >= 1 ? (
          <Button type="primary" onClick={() => editUser(record.Id)}>
            Edit
          </Button>
        ) : null,
    },
    {
      title: "Username",
      dataIndex: "Username",
      key: "Username",
    },
    {
      title: "Fullname",
      dataIndex: "Fullname",
      key: "Fullname",
    },
    {
      title: "Email Address",
      dataIndex: "EmailAddress",
      key: "EmailAddress",
    },
    {
      title: "Mobile No.",
      dataIndex: "MobileNo",
      key: "MobileNo",
    },
  ];

  const handleGetUsers = async () => {
    axios.defaults.baseURL = "http://localhost:53017/";
    const response = await axios.get("/api/getlistofusers", {
      params: {
        UserName: username,
        FullName: fullName,
      },
    });

    if (response) {
      console.log(response);
      setListOfUsers(response.data);
    }
  };

  useEffect(() => {
    handleGetUsers();
  }, [username, fullName]);

  useEffect(() => {
    handleGetUsers();
  }, []);
  return (
    <>
      <h1>Users</h1>
      <div>
        <Button type="primary" onClick={handleNew}>
          New
        </Button>
      </div>

      <div className="border shadow-md p-2 m-2">
        <div>
          <Space>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{ width: 300 }}
            />
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Fullname"
              style={{ width: 300 }}
            />
          </Space>
        </div>
        <div className="m2">
          <Table
            columns={tableUsers}
            dataSource={listOfUsers}
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
