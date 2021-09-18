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

  const [studyTime, setStudyTime] = useState<number>(0)
  const [breakTime, setBreakTime] = useState<number>(0)
  const [timeString, setTimeString] = useState<string>("0:00")
  const [timerStatus, setTimerStatus] = useState<string>("none")

  useEffect(() => {
    localStorage.setItem("timerStatus", timerStatus)
    if (timerStatus === 'study' || timerStatus === 'break') {
      countDown()
    } else {
      return
    }
  }, [timerStatus])

  const setTimer = (studyDur: number, breakDur: number) => {
    setTimerStatus("study")
    localStorage.setItem("studyTimeOrig", studyDur.toString())
    localStorage.setItem("breakTimeOrig", breakDur.toString())
    localStorage.setItem("studyTime", studyDur.toString())
    localStorage.setItem("breakTime", breakDur.toString())
  }

  const countDown = () => {
    const intervalId = setInterval(() => {
      const timerStatuss = localStorage.getItem("timerStatus")
      console.log(timerStatuss);
      if (timerStatuss === 'study') {
        const timeRemain: string = localStorage.getItem("studyTime")!
        if (timeRemain === '0') {
          setTimeout(() => {
            setTimerStatus('break')
          }, 200)
          clearInterval(intervalId)
        }
        console.log(timeRemain);
        setTimeString(convertTimeToString(parseInt(timeRemain)))
        localStorage.setItem("studyTime", (parseInt(timeRemain) - 1).toString())
      }
      if (timerStatuss === 'break') {
        const timeRemain: string = localStorage.getItem("breakTime")!
        if (timeRemain === '-1') {
          setTimerStatus('none')
          clearInterval(intervalId)
          localStorage.removeItem('studyTimeOrig')
          localStorage.removeItem('breakTimeOrig')
          localStorage.removeItem('studyTime')
          localStorage.removeItem('breakTime')
          setTimeout(() => {
            setTimeString('0:00')
          }, 200)        }
        console.log(timeRemain);
        setTimeString(convertTimeToString(parseInt(timeRemain)))
        localStorage.setItem("breakTime", (parseInt(timeRemain) - 1).toString())
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
      studyTime: studyTime,
      breakTime: breakTime,
      timeString: timeString,
      timerStatus: timerStatus,

      setStudyTime: setStudyTime,
      setBreakTime: setBreakTime,
      setTimeString: setTimeString,
      setTimerStatus: setTimerStatus,

      setTimer: setTimer,
      countDown: countDown,
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
