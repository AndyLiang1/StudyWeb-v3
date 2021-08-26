import * as React from 'react';
import { NavigationBar } from '../components/Navbar';
import { AuthContext } from '../helpers/AuthContext';
import { IFolder } from '../helpers/Interfaces';
import "./Css/ListFolders.css"


export interface IListFoldersProps {
}

export function ListFolders(props: IListFoldersProps) {
    const { authState, setAuthState } = React.useContext(AuthContext);
    const [folders, setFolders] = React.useState<IFolder[]>([])

    const getFolderList = async () => {
        fetch(`http://localhost:3000/api/v1/folders/${authState.id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")!,
            },
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                setFolders(responseJSON.foldersList)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        setAuthState(
            {
                name: localStorage.getItem("name")!,
                id: parseInt(localStorage.getItem("id")!),
                loggedIn: true
            }
        )
    }, [])

    React.useEffect(() => {
        getFolderList()
    }, [authState])
    return (
        <div>
            <NavigationBar loggedIn={authState.loggedIn}></NavigationBar>
            <div className="list_of_folders">
                {folders.map((oneFolder) => {
                    return (
                        <div className="one_folder">
                            <h1>{oneFolder.name}</h1>
                            <h3>Sets: {oneFolder.numSets}</h3>
                        </div>
                    )
                })}
            </div>            
        </div>
    );
}
