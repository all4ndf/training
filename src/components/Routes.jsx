import React from "react";
import { Switch, Route } from "react-router-dom";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Home from "./Home";
import Form3 from "./Form3";
import FormAntDesign from "./FormAntDesign";
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

      <Route
        exact
        strict
        path="/form3"
        component={Form3}
        render={() => <Form3 />}
      />

      <Route
        exact
        strict
        path="/formantdesign"
        component={FormAntDesign}
        render={() => <FormAntDesign />}
      />
    </Switch>
  );
};

export default Routes;
