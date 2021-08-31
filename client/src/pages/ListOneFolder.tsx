import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { RiStackFill } from 'react-icons/ri';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { NavigationBar } from "../components/Navbar"
import { EditPopUp } from "../components/CRUD/EditPopUp"
import { Profile } from '../components/Profile';
import { AuthContext } from '../helpers/AuthContext';
import { ISet } from '../helpers/Interfaces';
import "./Css/ListPage.css"
import { DeletePopUp } from '../components/CRUD/DeletePopUp'
import { useLocation } from "react-router-dom";
import { AiOutlinePlus } from 'react-icons/ai';
import { AddPopUp } from '../components/CRUD/AddPopUp';


export interface IListOneFolderProps {

}

export function ListOneFolder(props: IListOneFolderProps) {
    const { authState, setAuthState } = useContext(AuthContext);
    const [numSets, setNumSets] = useState<number>(0)
    const [addSetPopUpOpen, setAddSetPopUpOpen] = useState<boolean>(false)
    const [editSetPopUpOpen, setEditSetPopUpOpen] = useState<boolean>(false)
    const [deleteSetPopUpOpen, setDeleteSetPopUpOpen] = useState<boolean>(false)
    const [setId, setSetId] = useState<number>(0)
    const [folderId, setFolderId] = useState<number>(0)
    const [sets, setSets] = useState<ISet[]>([])
    const location = useLocation<{ folderIdFromURL: number, numFolders: number, folderName: string }>()
    const { folderIdFromURL, numFolders, folderName } = location.state


    const getSetList = async () => {
        fetch(`http://localhost:3000/api/v1/sets/all/${authState.id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")!,
            },
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                setNumSets(responseJSON.length)
                const setsInFolder: ISet[] = responseJSON.setsList.filter((oneSet: ISet) => {
                    if (oneSet.folderId === folderIdFromURL) {
                        return oneSet
                    }
                })
                console.log(setsInFolder)
                setSets(setsInFolder)
            })
            .catch((error) => {
                console.log(error);
            })

    }


    useEffect(() => {
        setAuthState(
            {
                name: localStorage.getItem("name")!,
                id: parseInt(localStorage.getItem("id")!),
                loggedIn: true
            }
        )
    }, [])

    useEffect(() => {
        getSetList()
    }, [authState])

    const editBtnOnClick = (event: React.MouseEvent<SVGElement>) => {
        const setId: string = event.currentTarget.getAttribute("data-setid")!
        if (deleteSetPopUpOpen) {
            setDeleteSetPopUpOpen(false)
        }
        setSetId(parseInt(setId))
        setEditSetPopUpOpen(true)
    }

    const deleteBtnOnClick = (event: React.MouseEvent<SVGElement>) => {
        const setId: string = event.currentTarget.getAttribute("data-setid")!
        const folderId: string = event.currentTarget.getAttribute("data-folderid")!
        if (editSetPopUpOpen) {
            setEditSetPopUpOpen(false)
        }
        setSetId(parseInt(setId))
        setFolderId(parseInt(folderId))
        setDeleteSetPopUpOpen(true)
    }

    const addSet = () => {
        setAddSetPopUpOpen(true)
    }

    return (
        <div className="list_page">
            <NavigationBar loggedIn={authState.loggedIn}></NavigationBar>
            <div className="profile_section_container">
                <Profile
                    name={authState.name}
                    numFolders={numFolders}
                    numSets={numSets}
                />
            </div>
            <h1 className="description">{folderName}'s sets</h1>
            <div
                onClick={addSet}
                className="add_item"
            >
                <AiOutlinePlus className="plus_btn"></AiOutlinePlus>
            </div>
            <div className="list_page_content">
                {sets.map((oneSet) => {
                    return (
                        <div className="one_item" key={oneSet.id}>
                            <div className="one_item_title_container">
                                <div className="one_item_folderImg_container">
                                    <RiStackFill className="one_item_folderIcon"></RiStackFill>
                                </div>
                                <div className="one_item_name">{oneSet.name}</div>

                            </div>

                            <div className="one_item_numChild">Cards: {oneSet.numCards}</div>
                            <div
                                className="one_item_btn_container">
                                <FaEdit
                                    onClick={editBtnOnClick}
                                    className="one_item_edit_btn"
                                    data-setid={oneSet.id}
                                />
                                <FaTrashAlt
                                    onClick={deleteBtnOnClick}
                                    className="one_item_delete_btn"
                                    data-setid={oneSet.id}
                                    data-folderid={oneSet.folderId}
                                ></FaTrashAlt>
                            </div>
                        </div>
                    )
                })}
            </div>
            {addSetPopUpOpen ? (
                <div className="list_page_add_container">
                    <AddPopUp
                        setAddPopUpOpen={setAddSetPopUpOpen}
                        getFolderOrSetOrCardList={getSetList}
                        folderId={folderIdFromURL}
                        itemToAdd="set"
                    ></AddPopUp>
                </div>
            ) : null}
            {editSetPopUpOpen ? (
                <div className="list_page_edit_container">
                    <EditPopUp
                        setEditPopUpOpen={setEditSetPopUpOpen}
                        getFolderOrSetOrCardList={getSetList}
                        setId={setId}
                        itemToEdit="set"
                    ></EditPopUp>
                </div>
            ) : null}
            {deleteSetPopUpOpen ? (
                <div className="list_page_delete_container">
                    <DeletePopUp
                        setDeletePopUpOpen={setDeleteSetPopUpOpen}
                        getFolderOrSetOrCardList={getSetList}
                        setId={setId}
                        folderId={folderId}
                        itemToDelete="set"
                    ></DeletePopUp>
                </div>
            ) : null}
        </div >
    );
}
