import React, { FC, useState, createContext, useEffect } from 'react';
import './App.css';
// import { AuthContext } from "./helpers/AuthContext"
import { NavigationBar } from "./components/Navbar"
import { AppContextInterface, AppContextPropsInterface } from "./helpers/Interfaces"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home"
import { User } from "./pages/User"
// import { authState, setAuthState } from "./helpers/AuthContext"
import { AuthContext, TimerContext } from "./helpers/Contexts"
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
  const [studyTimeInSec, setStudyTimeInSec] = useState<number>(0)
  const [originalStudyTime, setOriginalStudyTime] = useState<number>(0)
  const [originalBreakTime, setOriginalBreakTime] = useState<number>(0)
  const [timeString, setTimeString] = useState<string>("0:00")
  const [triggerCountDown, setTriggerCountDown] = useState<boolean>(false)
  const [breakTimeInSec, setBreakTimeInSec] = useState<number>(0)
  const [paused, setPaused] = useState<boolean>(false)
  const [reset, setReset] = useState<boolean>(false)
  const [timerStatus, setTimerStatus] = useState<string>("none")
  const [multOptionErr, setMultOptionErr] = useState<boolean>(false)
  const [timerPopUpOpen, setTimerPopUpOpen] = useState<boolean>(false)

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
      setMultOptionErr(true)
      setTimeout(() => {
        setMultOptionErr(false)
      }, 5000)
    }
    setTimerPopUpOpen(false)
  }


  // if false, then means break 
  const beginCountDown = (study: boolean) => {
    let storageNum: string | null = localStorage.getItem("studyTimeInSec")
    if (storageNum === 'null') {
      return
    }
    if (localStorage.getItem("timerStatus") === 'break') {
      storageNum = localStorage.getItem("breakTimeInSec")
    }
    let storageNumInSec: number = parseInt(storageNum!)

    const setIntervalId = setInterval(async () => {
      if (storageNumInSec === -1) {
        if (localStorage.getItem("timerStatus") != 'study') {
          console.log('notstudy ');
          console.log(localStorage.getItem("timerStatus"));
          setTriggerCountDown(false)
          setTimerStatus("none")

        } else {
          console.log('t', timerStatus);
          setTimerStatus("break")
        }
        setStudyTimeInSec(0)
        setTimeString("0:00")
        clearInterval(setIntervalId)

        localStorage.removeItem("paused");
        localStorage.removeItem("reset");
        // localStorage.removeItem("timerStatus");
      } else {
        if (localStorage.getItem("timerStatus")! === 'killed') {
          setTriggerCountDown(false)
          setStudyTimeInSec(0)
          setTimerStatus("none")
          setTimeString("0:00")
          localStorage.setItem("timerStatus", "none")
          if (localStorage.getItem("timerStatus") === 'study') {
            localStorage.removeItem("studyTimeInSec");
          } else if (localStorage.getItem("timerStatus") === 'break') {
            localStorage.removeItem("breakTimeInSec");
          }
          localStorage.removeItem("paused");
          localStorage.removeItem("reset");
          localStorage.removeItem("timerStatus");
          clearInterval(setIntervalId)
          return
        }
        if (localStorage.getItem("reset")! === 'true') {
          if (localStorage.getItem("timerStatus") === 'study') {
            storageNumInSec = originalStudyTime

          } else if (localStorage.getItem("timerStatus") === 'break') {
            storageNumInSec = originalBreakTime

          }
          localStorage.setItem("reset", 'false')
          setReset(false)
        }
        if (!(localStorage.getItem("paused") === 'true')) {
          console.log('executing');
          setTimeString(convertTimeToString(storageNumInSec))
          storageNumInSec = storageNumInSec - 1
          console.log(localStorage.getItem("timerStatus"));
          if (localStorage.getItem("timerStatus") === 'study') {
            localStorage.setItem("studyTimeInSec", (storageNumInSec).toString())
          } else if (localStorage.getItem("timerStatus") === 'break') {
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
    <TimerContext.Provider value={{
      studyTimeInSec: studyTimeInSec,
      timeString: timeString,
      triggerCountDown: triggerCountDown,
      setStudyTimeInSec: setStudyTimeInSec,
      setTimeString: setTimeString,
      setTriggerCountDown: setTriggerCountDown,
      breakTimeInSec: breakTimeInSec,
      setBreakTimeInSec: setBreakTimeInSec,
      paused: paused,
      setPaused: setPaused,
      reset: reset,
      setReset: setReset,
      originalStudyTime: originalStudyTime,
      setOriginalStudyTime: setOriginalStudyTime,
      originalBreakTime: originalBreakTime,
      setOriginalBreakTime: setOriginalBreakTime,
      timerStatus: timerStatus,
      setTimerStatus: setTimerStatus,
      multOptionErr: multOptionErr,
      setMultOptionErr: setMultOptionErr,
      timerPopUpOpen: timerPopUpOpen,
      setTimerPopUpOpen: setTimerPopUpOpen,

      setTimer: setTimer,
      beginCountDown: beginCountDown,
      convertTimeToString: convertTimeToString,
    }}>
      <AuthContext.Provider value={{
        authState: authState,
        setAuthState: setAuthState
      }}>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/user" exact component={User}></Route>
              <Route path="/listFolders" exact component={ListFolders}></Route>
              <Route path="/listSets" exact component={ListSets}></Route>
              <Route path="/listOneFolder" exact component={ListOneFolder}></Route>
              <Route path="/listCards" exact component={ListCards}></Route>
            </Switch>
          </Router>
        </div>
      </AuthContext.Provider>
    </TimerContext.Provider>
  );
}

export default App;
