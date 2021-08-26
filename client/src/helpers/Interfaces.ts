// =============================================================================
// Context
// =============================================================================
export interface AppContextInterface {
    name: string;
    id: number;
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
    id: number;
    name: string;
    numSets: number;
    userId: number;
}
export interface ISet {
    id: number;
    name: string;
    numCards: number;
    folderId: number;
    userId: number;
}

export interface IFolderForm {
    folderName: string;
}

export interface ISetForm {
    setName: string;
}

export interface ICardForm {
    question: string;
    answer: string;
}