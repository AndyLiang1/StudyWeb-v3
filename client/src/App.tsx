import React, { FC, useState } from 'react';
import './App.css';
import { AuthContext } from "./helpers/AuthContext"
import { NavigationBar } from "./components/Navbar"
import { AppContextInterface } from "./helpers/Interfaces"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home"
import { User } from "./pages/User"
const App: FC = () => {
  const contextValue: AppContextInterface = {
    name: "Andy",
    id: 1,
    logged_in: true,
  }
  return (
    <AuthContext.Provider value={contextValue}>
      <div className="App">
        <Router>
          <Switch>
            <Route path = "/" exact component = {Home}></Route>
            <Route path = "/user" exact component = {User}></Route>
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
