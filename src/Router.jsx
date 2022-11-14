import React from "react";
import { Switch, Route } from "react-router";
import SignUp from "./userCom/SignUp";
import Login from "./userCom/Login";
import ProcedureContainer from "./procedureCom/ProcedureContainer";
import ProcedureListContainer from "./procedureListCom/ProcedureListContainer";
import { ProcedureDetail } from "./procedureListCom/";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Login} />
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/create/procedure"} component={ProcedureContainer} />
      <Route exact path={"/procedureList"} component={ProcedureListContainer} />
      <Route path={"/procedure/detail/:id"} component={ProcedureDetail} />
    </Switch>
  );
};

export default Router;
