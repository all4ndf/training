import React from "react";
import { withRouter } from "react-router-dom";
import Routes from "./components/Routes";
const App = (props) => {
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
      </div>

      <Routes />
    </div>
  );
};

export default withRouter(App);
