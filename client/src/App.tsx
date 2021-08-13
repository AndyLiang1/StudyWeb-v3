import React, { FC } from 'react';
import './App.css';
import { AuthContext } from "./helpers/AuthContext"
import { AppContextInterface } from "./helpers/Interfaces"
import {Container, Card, CardHeader, CardBody, CardFooter} from 'reactstrap'


const App: FC = () => {
  const contextValue: AppContextInterface = {
    name: "Andy",
    id: 1,
    logged_in: true,
  }
  return (
    <AuthContext.Provider value={contextValue}>
      <div className="App">
        {/* <header>
          <h1 className="Title">STUDYWEB</h1>
          {contextValue.logged_in ? (
            <a className="logout" href="/">Log out</a>
          ) : (
            <a className="login" href="/">Log In</a>
          )}
        
        </header> */}
        <Container>
          <Card>
            <CardHeader>
              Header
            </CardHeader>
            <CardBody>
              Body
            </CardBody>
            <CardFooter>
              Footer
            </CardFooter>
          </Card>
        </Container>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
