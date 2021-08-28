
import * as React from 'react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import "./Css/Navbar.css"

export interface IAppProps {
  loggedIn: boolean;
}

export function NavigationBar({ loggedIn }: IAppProps) {
  const [isActive, setIsActive] = useState(false);
  let history = useHistory()


  const toggle = () => {
    console.log('isactive', isActive)
    setIsActive(!isActive)
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("loggedIn");
  }


  return (
    <nav className="navbar">
      <div className="brand_title">
        STUDYWEB
      </div>

      {loggedIn ? (
        <>
          <div className="navbar_links">
            <ul>
              <div className="nav_folder_and_sets">
                <li><a href="/user">Home</a></li>
                <li><a href="/listFolders" className="nav_folder">Folders</a></li>
                <li><a href="/listSets" className="nav_sets">Sets</a></li>
              </div>
              <div className="nav_logout_container">
                <li><a href="/" className="nav_logout" onClick={logout}>Logout</a></li>
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
                <li><a href="/user">Home</a></li>
                <li><a href="/listFolders">Folders</a></li>
                <li><a href="/listSets">Sets</a></li>
                <li><a href="/">Logout</a></li>
              </ul>
            </div>
          ) : null}
        </>
      ) : null}


    </nav>



  );
}
