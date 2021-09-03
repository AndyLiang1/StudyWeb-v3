import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { NavigationBar } from "../components/Navbar"
import { AddPopUp } from "../components/CRUD/AddPopUp"
import { AuthContext, TimerContext } from '../helpers/Contexts';
import { IFolder, ISet } from "../helpers/Interfaces"
import { Folder } from "../components/Folder"
import { Set } from "../components/Set"
import folderImg from "../img/greyfolder.png"
import flashcardImg from "../img/flashcards.png"
import timerImg from "../img/timer.png"
import { IoIosTimer } from "react-icons/io"
import { IoRefreshOutline } from "react-icons/io5"

import "./Css/User.css"
import { AppContextInterface } from '../helpers/Interfaces';
import { useHistory } from 'react-router-dom';
import { RiStackFill } from 'react-icons/ri';
import { AiOutlineFolder, AiOutlinePauseCircle } from 'react-icons/ai';
import { time } from 'console';
import { TimerPopUp } from '../components/Timer';

export interface IAppProps {
}

export function User(props: IAppProps) {
  const { authState, setAuthState } = useContext(AuthContext);
  const { timeInSeconds, timeString, timerOn, setTimeInSeconds,
    setTimeString, setTimerOn } = useContext(TimerContext)
  const [folders, setFolders] = useState<IFolder[]>([])
  const [sets, setSets] = useState<ISet[]>([])
  const [addFolderPopUpOpen, setAddFolderPopUpOpen] = useState<boolean>(false)
  const [addSetPopUpOpen, setAddSetPopUpOpen] = useState<boolean>(false)
  const [timerPopUpOpen, setTimerPopUpOpen] = useState<boolean>(false)

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
    if (addSetPopUpOpen || timerPopUpOpen) {
      setAddSetPopUpOpen(false)
      setTimerPopUpOpen(false)
    }
  }

  const openAddSetPopUp = () => {
    setAddSetPopUpOpen(true)
    if (addFolderPopUpOpen || timerPopUpOpen) {
      setAddFolderPopUpOpen(false)
      setTimerPopUpOpen(false)
    }
  }

  const openTimerPopUp = () => {
    setTimerPopUpOpen(true)
    if (addFolderPopUpOpen || addSetPopUpOpen) {
      setAddFolderPopUpOpen(false)
      setAddSetPopUpOpen(false)
    }
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

  useEffect(() => {
    
    if (timeInSeconds == 0) {
      console.log('here3');
      return;
    // } else if (timeInSeconds != 0 && timerOn) {
    //   return;
    } else {
      console.log('here2');
      setTimerOn(true)
    }

  }, [timeInSeconds])

  useEffect(() => {
    if (timerOn) {
      beginCountDown(timeInSeconds)
    }
    // console.log(`timer on being set `);

  }, [timerOn])

  const beginCountDown = (timeInSec: number) => {
    let durationInSec = timeInSec
    console.log(durationInSec);
    const setIntervalId = setInterval(async () => {
      if (durationInSec != -1) {
        console.log('executing');
        setTimeString(convertTimeToString(durationInSec))
        durationInSec = durationInSec - 1
        setTimeInSeconds(durationInSec)
      } else {
        console.log('done');
        clearInterval(setIntervalId)
        setTimerOn(false)
        setTimeInSeconds(0)
      }
    }, 1000)
  }

  const convertTimeToString = (timeInSec: number): string => {
    // Hours, minutes and seconds
    let hrs = Math.floor(timeInSec / 3600);
    let mins = Math.floor((timeInSec % 3600) / 60);
    let secs = Math.floor(timeInSec % 60);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }

  const goToSetsPage = async (event: React.MouseEvent<HTMLElement>) => {
    const folderId: number = parseInt(event.currentTarget.getAttribute("data-folderid")!)
    const folderName: string = event.currentTarget.getAttribute("data-foldername")!
    history.push({
      pathname: "/listOneFolder",
      state: {
        folderIdFromURL: folderId,
        numFolders: folders.length,
        folderName,
      }
    })
  }

  const goToCardsPage = ((event: React.MouseEvent<HTMLElement>) => {
    const setId: number = parseInt(event.currentTarget.getAttribute("data-setid")!)
    const setName: string = event.currentTarget.getAttribute("data-setname")!
    history.push({
      pathname: "/listCards",
      state: {
        setId,
        setName,
        numFolders: folders.length,
        numSets: sets.length,
      }
    })
  })

  // const setTimer = () => {
  //   console.log('here');
  //   setTimeInSeconds(30)
  // }
  // useEffect(() => {
  //   if (timeInSeconds != 0) {
  //     return;
  //   } else {
  //     console.log(timeInSeconds);
  //     console.log('herex');
  //     setTimerOn(true)
  //   }

  // }, [timeInSeconds])








  return (
    <div className="user_container">

      {addFolderPopUpOpen ? (
        <div className="add_folder_pop_up">
          <AddPopUp
            setAddPopUpOpen={setAddFolderPopUpOpen}
            itemToAdd="folder"
          ></AddPopUp>
        </div>
      ) : null}
      {addSetPopUpOpen ? (
        <div className="add_set_pop_up">
          <AddPopUp
            setAddPopUpOpen={setAddSetPopUpOpen}
            itemToAdd="set"
          ></AddPopUp>
        </div>
      ) : null}
      {timerPopUpOpen ? (
        // <div className="timer_pop_up">
        //   <h1>Time remaining: {timeString}</h1>
        //   <button onClick={setTimer}> Start </button>
        // </div>
        <div className="timer_pop_up">
          <TimerPopUp
            setTimerPopUpOpen={setTimerPopUpOpen}
            setTimeInSeconds={setTimeInSeconds}
            setTimerOn={setTimerOn}
            timerOn={timerOn}
            timeInSeconds={timeInSeconds}
            setTimeString={setTimeString}
          ></TimerPopUp>
        </div>

      ) : null}
      <NavigationBar loggedIn={authState.loggedIn}></NavigationBar>

      <div className="user_content_container">
        <div className="create_container">
          <div onClick={openAddFolderPopUp} className="create_folder">
            <h1 className="plus_btn">+</h1>
            <AiOutlineFolder className="icons"></AiOutlineFolder>
          </div>

          <div onClick={openAddSetPopUp} className="create_set">
            <h1 className="plus_btn">+</h1>
            <RiStackFill className="icons"></RiStackFill>
          </div>

          <div className="timer">
            <IoIosTimer onClick={openTimerPopUp} className="icons"></IoIosTimer>
          </div>
        </div>

        {timerOn ? (
          <div className="time_remaining_container">
            <div className="time_remaining_text">Time remaining: {timeString}</div>
            <AiOutlinePauseCircle className="pauseplay_refresh_btn"></AiOutlinePauseCircle>
            <IoRefreshOutline className="pauseplay_refresh_btn"></IoRefreshOutline>
          </div>
        ) : null}
        <div className="folders_container">
          <div className="folders_title_viewAll">
            <h1 className="folders_container_title">Your folders</h1>
            <a className="viewAll" onClick={() => { history.push("./listFolders") }}>View All &gt; </a>
          </div>

          <div className="user_list_of_folders">
            {folders.slice(0, 8).map((oneFolder) => {
              return (
                <div className="user_one_item"
                  key={oneFolder.id}
                  onClick={goToSetsPage}
                  data-folderid={oneFolder.id}
                  data-foldername={oneFolder.name}>
                  <div
                    className="user_one_item_title_container"
                  >
                    <div className="user_one_item_folderImg_container">
                      <AiOutlineFolder className="user_one_item_folderIcon"></AiOutlineFolder>
                    </div>
                    <div className="user_one_item_name" >{oneFolder.name}</div>

                  </div>

                  <div className="user_one_item_numChild">Sets: {oneFolder.numSets}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="sets_container">
          <div className="sets_title_viewAll">
            <h1 className="sets_container_title">Your sets</h1>
            <a className="viewAll" onClick={() => { history.push("./listSets") }}>View All &gt; </a>
          </div>
          <div className="user_list_of_sets">
            {sets.slice(0, 8).map((oneSet) => {
              return (
                <div
                  className="user_one_item"
                  key={oneSet.id}
                  onClick={goToCardsPage}
                  data-setid={oneSet.id}
                  data-setname={oneSet.name}
                >
                  <div className="user_one_item_title_container">
                    <div className="user_one_item_folderImg_container">
                      <RiStackFill className="user_one_item_folderIcon"></RiStackFill>
                    </div>
                    <div className="user_one_item_name">{oneSet.name}</div>
                  </div>
                  <div className="user_one_item_numChild">Cards: {oneSet.numCards}</div>
                </div>
              )
            })}
          </div>

        </div>
      </div>


    </div>
  );
}
