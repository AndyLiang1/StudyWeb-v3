import * as React from 'react';
import { NavigationBar } from "../components/Navbar"
import { LoginPopUp } from "../components/LoginPopUp"
import { RegistrationPopUp } from "../components/RegistrationPopUp"

import "./Css/Home.css"

export interface Props {

}

export const Home = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className="home_container">
        {/* <div className="image_box">
          <h1>hi</h1>
        </div>
        <div className="get_started">
          
        </div>
        */}
      </div>
       {/* <div className="test">
          <LoginPopUp></LoginPopUp>
  <RegistrationPopUp></RegistrationPopUp>
        </div> */}
        {/* <button>Register</button>
          <button>Login</button> */}
    </div>
  );
}