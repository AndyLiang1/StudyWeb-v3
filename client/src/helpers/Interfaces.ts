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

export interface TimeContextInterface {
    timeInSeconds: number;
    timeString: string;
    triggerCountDown: boolean;
}

export interface TimeContextPropsInterface {
    timeInSeconds: number;
    timeString: string;
    triggerCountDown: boolean;
    setTimeInSeconds: (time: number) => void;
    setTimeString: (time: string) => void;
    setTriggerCountDown: (isOn: boolean) => void;
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

export interface ICard {
    id: number;
    question: string;
    answer: string;
    setId: number;
}

export interface IAddFormFolder {
    name: string;
}

export interface IAddFormSet {
    name: string;
    folderToAddToId?: string;
}

export interface IAddFormCard {
    question: string;
    answer: string;
}

export interface IAddForm {
    name: string;
    folderToAddToId: number;
    question: string;
    answer: string;
}

export interface IEditForm {
    newName: string;
    newQuestion: string;
    newAnswer: string;
}


