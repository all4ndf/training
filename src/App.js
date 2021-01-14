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
    <div>
      <h1>App Js</h1>
      <button onClick={() => handleNavigatePage("/")}>Home</button>
      <button onClick={() => handleNavigateForm1()}>Form1</button>
      <button onClick={() => handleNavigatePage("/form2")}>Form2</button>
      <Routes />
    </div>
  );
};

export default withRouter(App);
