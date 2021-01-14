import React from "react";
import { withRouter } from "react-router-dom";
import Routes from "./components/Routes";
const App = (props) => {
  const handleNavigatePage = (path) => {
    props.history.push(path);
  };
  return (
    <div>
      <h1>App Js</h1>
      <button onClick={() => handleNavigatePage("/")}>Home</button>
      <button onClick={() => handleNavigatePage("/form1")}>Form1</button>
      <button onClick={() => handleNavigatePage("/form2")}>Form2</button>
      <Routes />
    </div>
  );
};

export default withRouter(App);
