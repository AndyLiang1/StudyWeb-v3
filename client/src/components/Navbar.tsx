
import * as React from 'react';
import { useContext, useState } from 'react';

import { AuthContext } from "../helpers/AuthContext"
import "./Css/Navbar.css"
import { LoginPopUp } from "./LoginPopUp"
import { RegistrationPopUp } from "./RegistrationPopUp"


import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
export interface IAppProps {
}

export function NavigationBar(props: IAppProps) {
  const authContext = useContext(AuthContext);
  console.log(authContext.logged_in)

  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive)
  }
  // const isActive = true
  return (

    // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    //   <Container fluid className="nav_container">
    //     <Navbar.Brand href="#home">STUDYWEB</Navbar.Brand>
    //     {authContext.logged_in ? (
    //       <>
    //         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //         <Navbar.Collapse>
    //           <Nav className="me-auto">
    //             <Nav.Link href="#">Folders</Nav.Link>
    //             <Nav.Link href="#">Sets</Nav.Link>

    //           </Nav>
    //           <Nav>
    //             <Nav.Link href="#memes">Logout</Nav.Link>
    //           </Nav>
    //         </Navbar.Collapse>
    //       </>
    //     ) : (
    //         <Nav>
    //           <div className = "rhs">
    //           <Nav.Link className = "rhs-btns" href="#memes">Sign up</Nav.Link>
    //           <Nav.Link className = "rhs-btns" href="#memes">Login</Nav.Link>
    //           </div>

    //         </Nav>
    //       )}


    //   </Container>
    // </Navbar>
    <nav className="navbar">
      <div className="brand_title">
        STUDYWEB
      </div>

      <div className="navbar_links">
        <ul>
          <div className="nav_folder_and_sets">
            <li><a href="#" className="nav_folder">Folders</a></li>
            <li><a href="#" className="nav_sets">Sets</a></li>
          </div>
          <div className = "nav_logout_container">
            <li><a href="#" className="nav_logout">Logout</a></li>
          </div>
        </ul>
      </div>

      <div className="toggle_wrapper">
        <a href="#" className="toggle_button" onClick={toggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </a>
      </div>
      {isActive ? (
        <div className="navbar_links_V">
          <ul>
            <li><a href="#">Folders</a></li>
            <li><a href="#">Sets</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
      ) : null}

    </nav>



  );
}
