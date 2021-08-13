import { createContext } from 'react'
import {AppContextInterface} from './Interfaces'

export const AuthContext = createContext<AppContextInterface>(
    {
        logged_in: false,
        name: "",
        id: 0
    })