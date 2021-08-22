import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { NavigationBar } from "../components/Navbar"
import { AddFolder } from "../components/AddFolder"
import { AuthContext } from '../helpers/AuthContext';
import { IFolder, ISet } from "../helpers/Interfaces"

import "./Css/User.css"

export interface IAppProps {
}

export function User(props: IAppProps) {
  const { authState, setAuthState } = useContext(AuthContext);
  const [folders, setFolders] = useState<IFolder[]>([])
  const [sets, setSets] = useState<ISet[]>([])
  const [addFolderPopUpOpen, setAddFolderPopUpOpen] = useState<boolean>(false)

  const setAuth = async (id: string) => {
    await setAuthState({
      name: localStorage.getItem("name"),
      id: parseInt(id),
      loggedIn: true
    })
  }

  const addFolder = (folderName: string) => {
    fetch(`http://localhost:3000/folders`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        accessToken: localStorage.getItem("accessToken")!
      },
      body: JSON.stringify({
        folderName,
        userId: authState.id
      }),
    })
  }

  useEffect(() => {
    setAuth(localStorage.getItem("id")!)
  }, [])

  return (
    <div>
      <NavigationBar loggedIn={authState.loggedIn}></NavigationBar>
      <div className="user_container">
        <div className="create_container">
          <div className="create_folder">
            <button>+</button>
            <div className="add_folder_pop_up">
            <AddFolder
              addFolderPopUpOpen = {addFolderPopUpOpen}
            ></AddFolder>
            </div>
            
          </div>
          <div className="create_set">

          </div>
        </div>

        <div className="list_of_folders"></div>
        <div className="list_of_sets"></div>
      </div>
    </div>
  );
}
