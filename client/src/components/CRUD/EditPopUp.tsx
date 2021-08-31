import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as Yup from 'yup'
import "../Css/AddEditPopUp.css"
import { IEditForm } from "../../helpers/Interfaces"

export interface IAppProps {
    setEditPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getFolderOrSetOrCardList: () => Promise<void>;
    setId?: number;
    folderId?: number;
    cardId?:number;
    itemToEdit: string;
}

export function EditPopUp({ setEditPopUpOpen, getFolderOrSetOrCardList, setId, folderId, itemToEdit }: IAppProps) {

    const initialValues = {
        newName: "",

    }

    const validationSchema = Yup.object().shape({
        newName: Yup.string().max(50).required(),
    })

    const submit = (submittedData: IEditForm) => {
        console.log('submittedData')
        let url;
        let body;
        if (itemToEdit === 'folder') {
            url = `http://localhost:3000/api/v1/folders`
            body = JSON.stringify({
                newFolderName: submittedData.newName,
                id: folderId
            })
        } else {
            url = `http://localhost:3000/api/v1/sets`
            body = JSON.stringify({
                newSetName: submittedData.newName,
                id: setId
            })
        }
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                accessToken: localStorage.getItem("accessToken")!,
            },
            body: body
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(`data is: `, data)
                setEditPopUpOpen(false)
                getFolderOrSetOrCardList()
            })
            .catch((error) => console.log(error));
    }


    return (
        <div className="edit_container">

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {({ errors, touched }) => (
                    <Form className="edit_form">

                        <div className="edit_title_container">
                            <h1 className="edit_title">Edit this {itemToEdit}</h1>

                            <AiOutlineCloseCircle className="edit_close_btn" onClick={() => { setEditPopUpOpen(false) }}></AiOutlineCloseCircle>
                        </div>

                        <div className="edit_content_container">
                            <div className="edit_details">
                                <label className="edit_label required" htmlFor="">New {itemToEdit} name</label>
                                <Field className="edit_field" name="newName" type="text" />
                                {errors.newName && touched.newName ? <div className="edit_field_errors">{errors.newName}</div> : null}
                            </div>
                            <button className="edit_button" type="submit">Edit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
