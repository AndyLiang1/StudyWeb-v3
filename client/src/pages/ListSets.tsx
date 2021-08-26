import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { AiOutlineFolder } from 'react-icons/ai';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { NumberSchema } from 'yup';
import { NavigationBar } from "../components/Navbar"
import { Profile } from '../components/Profile';
import { AuthContext } from '../helpers/AuthContext';
import { ISet } from '../helpers/Interfaces';
import "./Css/ListSets.css"

export interface IListSetProps {
}

export function ListSets(props: IListSetProps) {
    const { authState, setAuthState } = useContext(AuthContext);
    const [numFolders, setNumFolders] = useState<number>(0)
    const [numSets, setNumSets] = useState<number>(0)
    const [editSetPopUpOpen, setEditSetPopUpOpen] = useState<boolean>(false)
    const [editDeletePopUpOpen, setEditDeletePopUpOpen] = useState<boolean>(false)
    // const numFolders = 0
    // const numSets = 0
    // const name = "boop"
    const [sets, setSets] = useState<ISet[]>([])

    const getSetList = async () => {
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
                    return (
                        <div className="list_sets_page_one_set">
                            <div className="list_sets_page_one_set_title_container">
                                <div className="list_sets_page_one_set_folderImg_container">
                                    <AiOutlineFolder className="list_sets_page_one_set_folderIcon"></AiOutlineFolder>
                                </div>
                                <div className="list_sets_page_one_set_title" >{oneSet.name}</div>
                           
                            </div>

                            <div className="list_sets_page_one_set_cardNum">Cards: {oneSet.numCards}</div>
                            <div className="list_sets_page_one_set_btn_container">
                                <FaEdit className = "list_sets_page_one_set_edit_btn"></FaEdit>
                                <FaTrashAlt className = "list_sets_page_one_set_delete_btn"></FaTrashAlt>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}
