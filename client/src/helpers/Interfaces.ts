export interface AppContextInterface {
    name: string; 
    id: number;
    logged_in: boolean;
}

export interface IUser {
    name: string;
    id: number;
}

export interface IRegistrationForm {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}