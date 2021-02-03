import React from "react";
import { Button } from "antd";
const Users = (props) => {
  const handleNew = () => {
    props.history.push("/userinformation");
  };
  return (
    <>
      <h1>Users</h1>
      <div>
        <Button type="primary" onClick={handleNew}>
          New
        </Button>
      </div>
    </>
  );
};

export default Users;
