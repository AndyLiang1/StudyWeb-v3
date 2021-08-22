// =============================================================================
// Context
// =============================================================================
export interface AppContextInterface {
    name: string | null;
    id: number | null;
    loggedIn: boolean;
}

export interface AppContextPropsInterface {
    authState: AppContextInterface;
    setAuthState: (auth: AppContextInterface) => void
}
// =============================================================================
// Other interfaces 
// =============================================================================
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

export interface IUser {
    name: string;
    id: number;
}

export interface IFolder {
    name: string;
}

export interface ISet {
    name: string;
}

export interface ICard {
    question: string;
    answer: string;
}