import React from "react";
import { Switch, Route } from "react-router";
import SignUp from "./userCom/SignUp";
import Login from "./userCom/Login";
import ProcedureContainer from "./procedureCom/ProcedureContainer";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Login} />
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/create/procedure"} component={ProcedureContainer} />
    </Switch>
  );
};

export default Router;
