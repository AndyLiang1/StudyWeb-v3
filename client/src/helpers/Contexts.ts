import { createContext } from 'react'
import { AppContextInterface, AppContextPropsInterface } from './Interfaces'


export const AuthContext = createContext<AppContextPropsInterface>({
    authState: {
        name: "",
        id: 0,
        loggedIn: false
    },
    setAuthState : (auth: AppContextInterface) => {
        console.log('Set auth state has not been set up yet.')
    }

})

export const TimerContext = createContext<any>({
    timeInSeconds: 0,
    timeString: "0:00",
    timerOn: false,
    setTimeInSeconds: (time: number) => {},
    setTimeString: (time: string) => {},
    setTimerOn: (isOn: boolean) => {},
})
