import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { NavigationBar } from "../components/Navbar"
import { AddPopUp } from "../components/CRUD/AddPopUp"
import { AuthContext } from '../helpers/AuthContext';
import { IFolder, ISet } from "../helpers/Interfaces"
import { Folder } from "../components/Folder"
import { Set } from "../components/Set"
import folderImg from "../img/greyfolder.png"
import flashcardImg from "../img/flashcards.png"
import timerImg from "../img/timer.png"

import "./Css/User.css"
import { AppContextInterface } from '../helpers/Interfaces';
import { useHistory } from 'react-router-dom';

export interface IAppProps {
}

export function User(props: IAppProps) {
  const { authState, setAuthState } = useContext(AuthContext);
  const [folders, setFolders] = useState<IFolder[]>([])
  const [sets, setSets] = useState<ISet[]>([])
  const [addFolderPopUpOpen, setAddFolderPopUpOpen] = useState<boolean>(false)
  const [addSetPopUpOpen, setAddSetPopUpOpen] = useState<boolean>(false)
  let history = useHistory()

  const getFolderList = async () => {
    fetch(`http://localhost:3000/api/v1/folders/${authState.id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")!,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        setFolders(responseJSON.foldersList)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getSetList = async () => {
    fetch(`http://localhost:3000/api/v1/sets/all/${authState.id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")!,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log('sets list', responseJSON.foldersList)
        setSets(responseJSON.setsList)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const openAddFolderPopUp = () => {
    setAddFolderPopUpOpen(true)
    if (addSetPopUpOpen) {
      setAddSetPopUpOpen(false)
    }
  }

  const openAddSetPopUp = () => {
    setAddSetPopUpOpen(true)
    if (addFolderPopUpOpen) {
      setAddFolderPopUpOpen(false)
    }
  }

  const fakeSet = {
    id: 100,
    name: "set1",
    numCards: 1,
    folderId: 1,
    userId: 1
  }


  useEffect(() => {
    setAuthState(
      {
        name: localStorage.getItem("name")!,
        id: parseInt(localStorage.getItem("id")!),
        loggedIn: true
      }
    )
  }, [])

  useEffect(() => {
    getFolderList()
    getSetList()
  }, [authState])


  return (
    <div className="user_container">
      <NavigationBar loggedIn={authState.loggedIn}></NavigationBar>
      {addFolderPopUpOpen ? (
        <div className="add_folder_pop_up">
          <AddPopUp
            setAddPopUpOpen={setAddFolderPopUpOpen}
            itemToAdd = "folder"
          ></AddPopUp>
        </div>
      ) : null}
      {addSetPopUpOpen ? (
        <div className="add_set_pop_up">
          <AddPopUp
            setAddPopUpOpen={setAddSetPopUpOpen}
            itemToAdd = "set"
          ></AddPopUp>
        </div>
      ) : null}
      <div className="user_content_container">
        <div className="create_container">
          <div onClick={openAddFolderPopUp} className="create_folder">
            <h1 className="plus_btn">+</h1>

            <img src={folderImg}></img>
          </div>

          <div onClick={openAddSetPopUp} className="create_set">
            <h1 className="plus_btn">+</h1>
            <img src={flashcardImg}></img>
          </div>

          <div className="timer">
            <img src={timerImg}></img>
          </div>
        </div>

        <div className="folders_container">
          <div className="folders_title_viewAll">
            <h1 className="folders_container_title">Your folders</h1>
            <a className = "viewAll" onClick = {() => {history.push("./listFolders")}}>View All &gt; </a>
          </div>

          <div className="list_of_folders">
            {folders.map((oneFolder) => {
              return (
                <div className="one_folder">
                  <Folder folder={oneFolder}></Folder>
                </div>
              )
            })}
          </div>
        </div>

        <div className="sets_container">
          <div className="sets_title_viewAll">
          <h1 className="sets_container_title">Your sets</h1>
            <a className = "viewAll" onClick = {() => {history.push("./listSets")}}>View All &gt; </a>
          </div>
          <div className="list_of_sets">
            {sets.map((oneSet) => {
              return (
                <div className="one_set">
                  <Set set={oneSet}></Set>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
