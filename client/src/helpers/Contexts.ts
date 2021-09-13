import { createContext } from 'react'
import { AppContextInterface, AppContextPropsInterface } from './Interfaces'


export const AuthContext = createContext<AppContextPropsInterface>({
    authState: {
        name: "",
        id: 0,
        loggedIn: false
    },
    setAuthState: (auth: AppContextInterface) => {
        console.log('Set auth state has not been set up yet.')
    }

})

export const TimerContext = createContext<any>({
    studyTimeInSec: 0,
    setStudyTimeInSec: (time: number) => { },
    originalStudyTime: 0,
    setOriginalStudyTime: (time: number) => { },
    originalBreakTime: 0,
    setOriginalBreakTime: (time: number) => { },
    timeString: "0:00",
    setTimeString: (time: string) => { },
    triggerCountDown: false,
    setTriggerCountDown: (isOn: boolean) => { },
    timerOptionChanged: false,
    setTimerOptionChanged: (hasChanged: boolean) => { },
    breakTimeInSec: false,
    setBreakTimeInSec: (time: number) => { },
    paused: false,
    setPaused: (isPaused: boolean) => { },
    reset: false,
    setReset: (isReset: boolean) => { },
    timerStatus: "none",
    setTimerStatus: (status: string) => { },

    multOptionErr: false,
    setMultOptionErr:(isOn: boolean) => { },
    timerPopUpOpen: false,
    setTimerPopUpOpen: (isOn: boolean) => { },

    // =========================================================================
    // Functions
    // =========================================================================
    setTimer: (studyLength: number, breakLength: number) => { },
    beginCountDown :(study: boolean) => { },
    convertTimeToString :(timeInSec: number) => { },
})
