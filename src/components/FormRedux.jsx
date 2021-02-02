import React, { useState } from "react";
import { Button, Space } from "antd";
import { increment, decrement, updateUser } from "../actions";
import { useDispatch } from "react-redux";
import { Input } from "antd";
const FormRedux = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleUpdateUser = () => {
    dispatch(
      updateUser({
        username: username,
        fullname: fullname,
      })
    );
  };
  return (
    <>
      <h1>Form Redux</h1>
      <Space>
        <Button onClick={handleIncrement} type="primary">
          Increment
        </Button>
        <Button onClick={handleDecrement} type="primary">
          Decrement
        </Button>

        <div>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <Input
            placeholder="Fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <Button onClick={handleUpdateUser} type="primary">
          Update User
        </Button>
      </Space>
    </>
  );
};

export default FormRedux;
