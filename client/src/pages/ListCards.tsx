import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { ICard, ISet } from '../helpers/Interfaces';
import "./Css/ListCards.css"
import ReactCardFlip from 'react-card-flip';
import { BsArrowLeftShort, BsArrowRightShort, BsPlusSquare } from 'react-icons/bs';
import { Profile } from '../components/Profile';
import { NavigationBar } from '../components/Navbar';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
import { FiPlusSquare, FiEdit, FiTrash2 } from 'react-icons/fi'
import { AddPopUp } from '../components/CRUD/AddPopUp';
import { DeletePopUp } from '../components/CRUD/DeletePopUp';
import { EditPopUp } from '../components/CRUD/EditPopUp';
export interface IListCardsProps {
}

export function ListCards(props: IListCardsProps) {
    const { authState, setAuthState } = useContext(AuthContext);
    const location = useLocation<{ setId: number, setName: string, numFolders: number, numSets: number }>()
    const { setId, setName, numFolders, numSets } = location.state
    const [addPopUpOpen, setAddPopUpOpen] = useState<boolean>(false)
    const [editPopUpOpen, setEditPopUpOpen] = useState<boolean>(false)
    const [deletePopUpOpen, setDeletePopUpOpen] = useState<boolean>(false)
    const [sets, setSets] = useState<ISet[]>([])
    const [cards, setCards] = useState<ICard[]>([])
    const [displayedIndex, setDisplayedIndex] = useState<number>(1) // this is one higher than array index
    const [isFlipped, setIsFlipped] = React.useState<boolean>(false);


    const getCardList = async () => {
        fetch(`http://localhost:3000/api/v1/cards/${setId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")!,
            },
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                setCards(responseJSON.cardsList)
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
        getCardList()
    }, [authState])

    const handleFlip = (() => {
        setIsFlipped(!isFlipped)
    })


    const changeIndex = (direction: string) => {
        console.log(direction)
        if (displayedIndex == 1 && direction === 'neg') {
            return
        }
        if (displayedIndex == cards.length && direction === 'pos') {
            return
        }
        let index;
        if (direction == "neg") {
            index = displayedIndex - 1;
            setDisplayedIndex(index)
        } else {
            index = displayedIndex + 1;
            setDisplayedIndex(index)
        }
    }

    return (
        <div className="list_cards_page">
            <NavigationBar loggedIn={authState.loggedIn}></NavigationBar>

            <div className="list_cards_page_content">
                <div className="list_cards_set_title">
                    {setName}
                </div>
                <div className="list_cards_card_section">
                    <div className="list_cards_card_container">
                        <div className="list_cards_card">

                            <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                                <div onClick={handleFlip} className="list_cards_card_front">
                                    <h1>{cards[displayedIndex-1] ? cards[displayedIndex-1].question : ""}</h1>
                                </div>
                                <div onClick={handleFlip} className="list_cards_card_back">
                                    <h1>{cards[displayedIndex-1] ? cards[displayedIndex-1].answer : ""}</h1>
                                </div>
                            </ReactCardFlip>

                        </div>
                    </div>

                    <div className="list_cards_change_card">
                        <BsArrowLeftShort
                            onClick={() => changeIndex("neg")}
                            className="list_cards_arrow_btn"></BsArrowLeftShort>
                        <h3 className="list_cards_display_index">{displayedIndex}/{cards.length}</h3>
                        <BsArrowRightShort
                            onClick={() => changeIndex("pos")}
                            className="list_cards_arrow_btn"></BsArrowRightShort>
                    </div>
                </div>

                <div className="list_cards_card_CRUD">
                    <FiPlusSquare className="list_cards_add_btn"></FiPlusSquare>
                    <FiEdit className="list_cards_edit_btn"></FiEdit>
                    <FiTrash2 className="list_cards_delete_btn"></FiTrash2>
                </div>



            </div>


            {addPopUpOpen ? (
                <div className="list_page_add_container">
                    <AddPopUp
                        setAddPopUpOpen={setAddPopUpOpen}
                        getFolderOrSetOrCardList={getCardList}
                        setId={setId}
                        itemToAdd="card"
                    ></AddPopUp>
                </div>
            ) : null}
            {editPopUpOpen ? (
                <div className="list_page_edit_container">
                    <EditPopUp
                        setEditPopUpOpen={setEditPopUpOpen}
                        getFolderOrSetOrCardList={getCardList}
                        cardId={cards[displayedIndex-1].id}
                        itemToEdit="card"
                    ></EditPopUp>
                </div>
            ) : null}
            {deletePopUpOpen ? (
                <div className="list_page_delete_container">
                    <DeletePopUp
                        setDeletePopUpOpen={setDeletePopUpOpen}
                        getFolderOrSetOrCardList={getCardList}
                        setId={setId}
                        cardId={cards[displayedIndex-1].id}
                        itemToDelete="card"
                    ></DeletePopUp>
                </div>
            ) : null}


        </div>
    );
}