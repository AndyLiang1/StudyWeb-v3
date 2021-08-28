import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import "../Css/DeletePopUp.css"

export interface IDeleteSetPopUpProps {
    setDeleteSetPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getSetList: () => Promise<void>;
    setId: number;
    folderId: number;
}



export function DeleteSetPopUp({ setDeleteSetPopUpOpen, getSetList, setId, folderId }: IDeleteSetPopUpProps) {

    const deleteOnClick = () => {
        fetch(`http://localhost:3000/api/v1/sets/${setId}/${folderId}`, {
            method: "DELETE",
            headers: {
                accessToken: localStorage.getItem("accessToken")!,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setDeleteSetPopUpOpen(false)
                getSetList()
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="delete_container">
            <div className="delete_title_container">
                <h1>Delete set?</h1>
                <AiOutlineCloseCircle className="delete_close_btn" onClick={() => setDeleteSetPopUpOpen(false)}></AiOutlineCloseCircle>
            </div>
            <div className="delete_content_container">
                <button
                    onClick={() => deleteOnClick()}
                    className="delete_yes_button"
                >Yes</button>
                <button
                    onClick={() => setDeleteSetPopUpOpen(false)}
                    className="delete_no_button"
                >No</button>
            </div>
        </div>
    );
}
