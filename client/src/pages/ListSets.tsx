import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { NumberSchema } from 'yup';
import { NavigationBar } from "../components/Navbar"
import { EditSetPopUp } from "../components/CRUD_set/EditSetPopUp"
import { Profile } from '../components/Profile';
import { AuthContext } from '../helpers/AuthContext';
import { ISet } from '../helpers/Interfaces';
import "./Css/ListSets.css"
import { DeleteSetPopUp } from '../components/CRUD_set/DeleteSetPopUp';

export interface IListSetProps {
}

export function ListSets(props: IListSetProps) {
    const { authState, setAuthState } = useContext(AuthContext);
    const [numFolders, setNumFolders] = useState<number>(0)
    const [numSets, setNumSets] = useState<number>(0)
    const [editSetPopUpOpen, setEditSetPopUpOpen] = useState<boolean>(false)
    const [deleteSetPopUpOpen, setDeleteSetPopUpOpen] = useState<boolean>(false)
    const [setId, setSetId] = useState<number>(0)
    const [folderId, setFolderId] = useState<number>(0)
    const [sets, setSets] = useState<ISet[]>([])

    const getSetList = async () => {
        console.log(authState.id)
        fetch(`http://localhost:3000/api/v1/sets/all/${authState.id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")!,
            },
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                console.log('sets list', responseJSON.foldersList)
                setSets(responseJSON.setsList)
            })
            .catch((error) => {
                console.log(error);
            });
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




    return (
        <div className="list_sets_page">
            <NavigationBar loggedIn={authState.loggedIn}></NavigationBar>
            <div className="profile_section_container">
                <Profile
                    name={authState.name}
                    numFolders={numFolders}
                    numSets={numSets}
                />
            </div>
            <div className="list_sets_page_list_of_sets">
                {sets.map((oneSet) => {
                    console.log(oneSet)
                    return (
                        <div className="list_sets_page_one_set" key={oneSet.id}>
                            <div className="list_sets_page_one_set_title_container">
                                <div className="list_sets_page_one_set_folderImg_container">
                                    <AiOutlineFolder className="list_sets_page_one_set_folderIcon"></AiOutlineFolder>
                                </div>
                                <div className="list_sets_page_one_set_title" >{oneSet.name}</div>

                            </div>

                            <div className="list_sets_page_one_set_cardNum">Cards: {oneSet.numCards}</div>
                            <div
                                className="list_sets_page_one_set_btn_container">
                                <FaEdit
                                    onClick={editBtnOnClick}
                                    className="list_sets_page_one_set_edit_btn"
                                    data-setid={oneSet.id}
                                />
                                <FaTrashAlt
                                    onClick={deleteBtnOnClick}
                                    className="list_sets_page_one_set_delete_btn"
                                    data-setid={oneSet.id}
                                    data-folderid = {oneSet.folderId}
                                ></FaTrashAlt>
                            </div>
                        </div>
                    )
                })}
            </div>
            {editSetPopUpOpen ? (
                <div className="list_sets_page_edit_container">
                    <EditSetPopUp
                        setEditSetPopUpOpen={setEditSetPopUpOpen}
                        getSetList={getSetList}
                        setId={setId}
                    ></EditSetPopUp>
                </div>
            ) : null}
            {deleteSetPopUpOpen ? (
                <div className="list_sets_page_delete_container">
                    <DeleteSetPopUp
                        setDeleteSetPopUpOpen={setDeleteSetPopUpOpen}
                        getSetList={getSetList}
                        setId={setId}
                        folderId = {folderId}
                    ></DeleteSetPopUp>
                </div>
            ) : null}


        </div >
    );
}
