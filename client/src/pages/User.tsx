import * as React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
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
import { AiOutlineCloseCircle, AiOutlineFolder, AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { clear, time } from 'console';
import { TimerPopUp } from '../components/Timer';
import { CustomTimerPopUp } from '../components/CRUD/CustomTimerPopUp';

export interface IAppProps {
}

export function User(props: IAppProps) {
  const { authState, setAuthState } = useContext(AuthContext);
  const { studyTimeInSec, timeString, triggerCountDown, setStudyTimeInSec,
    setTimeString, setTriggerCountDown, paused, setPaused, originalStudyTime,
    setOriginalStudyTime, originalBreakTime, setOriginalBreakTime, reset, setReset, timerStatus, setTimerStatus } = useContext(TimerContext)
  const [folders, setFolders] = useState<IFolder[]>([])
  const [sets, setSets] = useState<ISet[]>([])
  const [addFolderPopUpOpen, setAddFolderPopUpOpen] = useState<boolean>(false)
  const [addSetPopUpOpen, setAddSetPopUpOpen] = useState<boolean>(false)
  const [timerPopUpOpen, setTimerPopUpOpen] = useState<boolean>(false)
  const [customTimerPopUpOpen, setCustomTimerPopUpOpen] = useState<boolean>(false)
  const [multOptionErr, setMultOptionErr] = useState<boolean>(false)
  let history = useHistory()

  const getFolderList = async () => {
    console.log('getting folders');
    fetch(`http://localhost:3000/api/v1/folders/${authState.id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken")!,
      },
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON.foldersList);
        setFolders(responseJSON.foldersList)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getSetList = async () => {
    console.log('getting sets');

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

  // ===========================================================================
  // Timer
  // ===========================================================================

  useEffect(() => {
    localStorage.setItem("paused", paused)
  }, [paused])

  useEffect(() => {
    localStorage.setItem("reset", reset)
  }, [reset])

  useEffect(() => {
    localStorage.setItem("status", timerStatus)
    if(timerStatus === 'break') {
      beginCountDown(false)
    }
  }, [timerStatus])

  useEffect(() => {
    if (studyTimeInSec != 0) {
      beginCountDown(true)
    }
  }, [studyTimeInSec])



  const setTimer = (studyLength: number, breakLength: number) => {
    const studyLengthInSec = studyLength 
    const breakLengthInSec = breakLength 
    if (studyTimeInSec === 0) {
      setStudyTimeInSec(studyLengthInSec);
      localStorage.setItem("studyTimeInSec", studyLengthInSec.toString())
      setTriggerCountDown(true)
      setOriginalStudyTime(studyLengthInSec);
      setOriginalBreakTime(breakLengthInSec);
      localStorage.setItem("breakTimeInSec", breakLengthInSec.toString())
      setTimerStatus("study")
    } else {
      console.log('rej');
      setMultOptionErr(true)
      setTimeout(() => {
        setMultOptionErr(false)
      }, 5000)
    }
    setTimerPopUpOpen(false)
  }


  // if false, then means break 
  const beginCountDown = (study: boolean) => {
    console.log(study);
    let storageNum: string | null = localStorage.getItem("studyTimeInSec")
    if (storageNum === 'null') {
      return
    }
    if(timerStatus === 'break') {
      storageNum = localStorage.getItem("breakTimeInSec")
    }
    let storageNumInSec: number = parseInt(storageNum!)

    const setIntervalId = setInterval(async () => {
      // if(timerOptionChanged) {
      //   clearInterval(setIntervalId)
      // }
      if (storageNumInSec === -1) {
        if(timerStatus != 'study') {
          setTriggerCountDown(false)
          setTimerStatus("none")

        } else {
          setTimerStatus("break")
        }
        setStudyTimeInSec(0)
        setTimeString("0:00")
        clearInterval(setIntervalId)
        
        localStorage.removeItem("paused");
        localStorage.removeItem("reset");
        localStorage.removeItem("status");
      } else {
        if (localStorage.getItem("status")! === 'killed') {
          setTriggerCountDown(false)
          setStudyTimeInSec(0)
          setTimerStatus("none")
          setTimeString("0:00")
          localStorage.setItem("status", "none")
          if( timerStatus === 'study') {
            localStorage.removeItem("studyTimeInSec");
          } else if (timerStatus === 'break') {
            localStorage.removeItem("breakTimeInSec");
          }          
          localStorage.removeItem("paused");
          localStorage.removeItem("reset");
          localStorage.removeItem("status");
          clearInterval(setIntervalId)
          return
        }
        if (localStorage.getItem("reset")! === 'true') {
          if(timerStatus === 'study') {
            storageNumInSec = originalStudyTime

          } else if (timerStatus === 'break') {
            storageNumInSec = originalBreakTime

          }
          localStorage.setItem("reset", 'false')
          setReset(false)
        }
        if (!(localStorage.getItem("paused") === 'true')) {
          console.log('executing');
          setTimeString(convertTimeToString(storageNumInSec))
          storageNumInSec = storageNumInSec - 1
          if( timerStatus === 'study') {
            localStorage.setItem("studyTimeInSec", (storageNumInSec).toString())
          } else if (timerStatus === 'break') {
            localStorage.setItem("breakTimeInSec", (storageNumInSec).toString())
          }
        }

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

  return (
    <div className="user_container">

      {addFolderPopUpOpen ? (
        <div className="add_folder_pop_up">
          <AddPopUp
            setAddPopUpOpen={setAddFolderPopUpOpen}
            itemToAdd="folder"
            getFolderOrSetOrCardList={getFolderList}
          ></AddPopUp>
        </div>
      ) : null}
      {addSetPopUpOpen ? (
        <div className="add_set_pop_up">
          <AddPopUp
            setAddPopUpOpen={setAddSetPopUpOpen}
            itemToAdd="set"
            getFolderOrSetOrCardList={getSetList}
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
            setStudyTimeInSec={setStudyTimeInSec}
            setTriggerCountDown={setTriggerCountDown}
            studyTimeInSec={studyTimeInSec}
            setMultOptionErr={setMultOptionErr}
            setOriginalStudyTime={setOriginalStudyTime}
            setCustomTimerPopUpOpen={setCustomTimerPopUpOpen}
            setTimer={setTimer}
          ></TimerPopUp>
        </div>

      ) : null}
      {customTimerPopUpOpen ? (
        <div className="custom_timer_pop_up">
          <CustomTimerPopUp
            setCustomTimerPopUpOpen={setCustomTimerPopUpOpen}
            setTimer={setTimer}
          ></CustomTimerPopUp>
        </div>
      ) : null}
      <NavigationBar loggedIn={authState.loggedIn}></NavigationBar>

      <div className="user_content_container">
        <div className="create_container">
          <div className="create_folder">
            <h1 className="plus_btn">+</h1>
            <AiOutlineFolder onClick={openAddFolderPopUp} className="icons"></AiOutlineFolder>
          </div>

          <div className="create_set">
            <h1 className="plus_btn">+</h1>
            <RiStackFill onClick={openAddSetPopUp} className="icons"></RiStackFill>
          </div>

          <div className="timer">
            <IoIosTimer onClick={openTimerPopUp} className="icons"></IoIosTimer>
          </div>
        </div>

        {triggerCountDown ? (
          <div className="time_remaining_container">
            <div className="time_remaining_text">Time remaining: {timeString}</div>
            {!paused ? (
              <AiOutlinePauseCircle onClick={() => setPaused(true)} className="pauseplay_refresh_close_btn"></AiOutlinePauseCircle>
            ) : (
                <AiOutlinePlayCircle onClick={() => setPaused(false)} className="pauseplay_refresh_close_btn"></AiOutlinePlayCircle>
              )}
            <IoRefreshOutline onClick={() => setReset(true)} className="pauseplay_refresh_close_btn"></IoRefreshOutline>
            <AiOutlineCloseCircle className="pauseplay_refresh_close_btn" onClick={() => { setTimerStatus("killed") }}></AiOutlineCloseCircle>
          </div>
        ) : null}
        {
          multOptionErr ? (
            <div className="timer_option_err">Already have a timer, please stop this timer first!</div>
          ) : null
        }
        <div className="folders_container">
          <div className="folders_title_viewAll">
            <h1 className="folders_container_title">Your folders</h1>
            <a className="viewAll" onClick={() => { history.push("./listFolders") }}>View All &gt; </a>
          </div>

          <div className="user_list_of_folders">
            {folders.slice(0, 10).map((oneFolder) => {
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
