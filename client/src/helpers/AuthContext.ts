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
