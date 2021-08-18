
import * as React from 'react';
import { useContext, useState } from 'react';

import { AuthContext } from "../helpers/AuthContext"
import "./Css/Navbar.css"
import {LoginPopUp} from "./LoginPopUp"
import {RegistrationPopUp} from "./RegistrationPopUp"


import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
export interface IAppProps {
}

export function NavigationBar(props: IAppProps) {
  const authContext = useContext(AuthContext);
  console.log(authContext.logged_in)

  const [isOpen, setIsOpen] = useState(false);

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
    <div className = "test"><LoginPopUp></LoginPopUp>
    <RegistrationPopUp></RegistrationPopUp></div>
                        

  );
}
