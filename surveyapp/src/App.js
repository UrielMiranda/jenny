import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Redirect to="/login"/>
      </BrowserRouter>
    </div>
  );
};
export default App;
