import React from "react";
import { withRouter } from "react-router-dom";
import Routes from "./components/Routes";
import { useSelector } from "react-redux";
const App = (props) => {
  const counter = useSelector((state) => state.count);
  const userDetails = useSelector((state) => state.userDetails);
  const handleNavigatePage = (path) => {
    props.history.push(path);
  };
  const handleNavigateForm1 = () => {
    props.history.push({
      pathname: "/form1",
      state: {
        patientNo: "000001",
      },
    });
  };
  return (
    <div className="p-3">
      <h1>App Js</h1>
      {counter}
      <div className="font-semibold">{userDetails.username}</div>
      <div className="font-semibold">{userDetails.fullname}</div>

      <div className="space-x-2">
        <button className="btn" onClick={() => handleNavigatePage("/")}>
          Home
        </button>
        <button className="btn" onClick={() => handleNavigateForm1()}>
          Form1
        </button>
        <button
          className="btn"
          onClick={() => handleNavigatePage("/formantdesign")}
        >
          Form Ant Design
        </button>

        <button
          className="btn"
          onClick={() => handleNavigatePage("/sampleform1")}
        >
          Sample Form 1
        </button>

        <button
          className="btn"
          onClick={() => handleNavigatePage("/itemprofile")}
        >
          Item Profile
        </button>

        <button
          className="btn"
          onClick={() => handleNavigatePage("/chargeform")}
        >
          Charge Form
        </button>

        <button
          className="btn"
          onClick={() => handleNavigatePage("/generaljournal")}
        >
          General Journal
        </button>

        <button
          className="btn"
          onClick={() => handleNavigatePage("/formredux")}
        >
          Redux Form
        </button>

        <button className="btn" onClick={() => handleNavigatePage("/users")}>
          Users
        </button>
      </div>

      <Routes />
    </div>
  );
};

export default withRouter(App);
