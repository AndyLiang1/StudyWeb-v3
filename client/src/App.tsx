import React, { FC, useState, createContext, useEffect } from 'react';
import './App.css';
// import { AuthContext } from "./helpers/AuthContext"
import { NavigationBar } from "./components/Navbar"
import { AppContextInterface, AppContextPropsInterface } from "./helpers/Interfaces"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home"
import { User } from "./pages/User"
// import { authState, setAuthState } from "./helpers/AuthContext"
import { AuthContext } from "./helpers/Contexts"
import { ListFolders } from './pages/ListFolders';
import { ListSets } from './pages/ListSets';
import { ListOneFolder } from './pages/ListOneFolder';
import { ListCards } from './pages/ListCards'



const App: FC = () => {
  const [authState, setAuthState] = useState<AppContextInterface>({
    name: "",
    id: 0,
    loggedIn: false,
  })
  
  return (
    <AuthContext.Provider value={{
      authState: authState,
      setAuthState: setAuthState
    }}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/user" exact component={User}></Route>
            <Route path="/listFolders" exact component = {ListFolders}></Route>
            <Route path="/listSets" exact component = {ListSets}></Route>
            <Route path="/listOneFolder" exact component = {ListOneFolder}></Route>
            <Route path="/listCards" exact component = {ListCards}></Route>
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
