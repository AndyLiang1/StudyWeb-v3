import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as Yup from 'yup'
import "../Css/AddEditPopUp.css"
import { IAddForm, IFolder } from "../../helpers/Interfaces"
import { useContext } from 'react';
import { AuthContext } from '../../helpers/AuthContext';

export interface IAppProps {
    setAddPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    itemToAdd: string;
    folderId?: number; // for adding a set to a known folder 
    setId?: number; // for adding a card to a set
    getFolderOrSetOrCardList?: () => Promise<void>;
    listFolders?: IFolder[];
    showSecondBox?: boolean;
}

export function AddPopUp({ setAddPopUpOpen, getFolderOrSetOrCardList, itemToAdd, folderId, listFolders, showSecondBox }: IAppProps) {
    const { authState } = useContext(AuthContext)
    const initialValues = {
        name: "",
        folderToAddToId: 0
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().max(50).required(),
        folderToAddToId: Yup.number(),
    })

    const submit = (submittedData: any) => {
        let url
        let body
        console.log(`data`, submittedData)
        if (itemToAdd === 'folder') {
            url = `http://localhost:3000/api/v1/folders`
            body = JSON.stringify({
                folderName: submittedData.name,
                userId: authState.id
            })
        } else {
            console.log(`sub`, submittedData.folderToAddToId)
            let folderToAddToId: number | null = parseInt(submittedData.folderToAddToId)
            if (folderToAddToId === 0) {
                folderToAddToId = null
            }

            if (folderId) {
                folderToAddToId = folderId
            }
            url = `http://localhost:3000/api/v1/sets`
            body = JSON.stringify({
                setName: submittedData.name,
                folderId: folderToAddToId,
                userId: authState.id,
            })
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                accessToken: localStorage.getItem("accessToken")!,
            },
            body: body
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(`data is: `, data)
                setAddPopUpOpen(false)
                if (getFolderOrSetOrCardList != undefined) {
                    console.log('indeed')
                    getFolderOrSetOrCardList()
                }
            })
            .catch((error) => console.log(error));

    }

    return (
        <div className="add_container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {({ errors, touched }) => (
                    <Form className="add_form">
                        <div className="add_title_container">
                            <h1 className="add_title">Create a new {itemToAdd}</h1>
                            <AiOutlineCloseCircle className="add_close_btn" onClick={() => { setAddPopUpOpen(false) }}></AiOutlineCloseCircle>
                        </div>

                        <div className="add_content_container">
                            <div className="add_details">
                                <label className="add_label required" htmlFor="">New {itemToAdd} name</label>
                                <Field className="add_field" name="name" type="text" />
                                {errors.name && touched.name ? <div className="add_field_errors">{errors.name}</div> : null}
                            </div>
                            {showSecondBox ? (
                                <div className="add_details">
                                    <label className="add_label">Add set to a folder? </label>
                                    <Field className="add_field" name="folderToAddToId" as="select">
                                        <option className="add_field"
                                            value='0'>
                                            None
                                        </option>
                                        {

                                            listFolders?.map((oneFolder) => {
                                                return (
                                                    <option
                                                        className="add_field"
                                                        data-folderid={oneFolder.id}
                                                        value={oneFolder.id.toString()}>
                                                        {oneFolder.name}
                                                    </option>
                                                )
                                            })

                                        }
                                    </Field>
                                    {errors.folderToAddToId &&
                                        touched.folderToAddToId &&
                                        <div className="input-feedback">
                                            {errors.folderToAddToId}
                                        </div>}
                                </div>
                            ) : null}

                            <button className="add_button" type="submit">Add</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
