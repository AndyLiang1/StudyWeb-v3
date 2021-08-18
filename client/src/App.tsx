import React, { FC, useState } from 'react';
import './App.css';
import { AuthContext } from "./helpers/AuthContext"
import {NavigationBar} from "./components/Navbar"
import { AppContextInterface } from "./helpers/Interfaces"

const App: FC = () => {
  const contextValue: AppContextInterface = {
    name: "Andy",
    id: 1,
    logged_in: true,
  }
  return (
    <AuthContext.Provider value={contextValue}>
      <div className="App">
       <NavigationBar></NavigationBar>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
