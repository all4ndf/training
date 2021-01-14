import React from "react";
import { Switch, Route } from "react-router-dom";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Home from "./Home";
const Routes = () => {
  return (
    <Switch>
      <Route exact strict path="/" component={Home} render={() => <Home />} />

      <Route
        exact
        strict
        path="/form1"
        component={Form1}
        render={() => <Form1 />}
      />
      <Route
        exact
        strict
        path="/form2"
        component={Form2}
        render={() => <Form2 />}
      />
    </Switch>
  );
};

export default Routes;
