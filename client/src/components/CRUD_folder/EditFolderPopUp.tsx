import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as Yup from 'yup'
import "./Css/EditFolderPopUp.css"
import { IFolderForm } from "../../helpers/Interfaces"
import { AuthContext } from '../../helpers/AuthContext';

export interface IAppProps {
    setEditFolderPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentName: string;
    newName: string;
}

export function EditFolderPopUp({ setEditFolderPopUpOpen }: IAppProps) {
    const { authState, setAuthState } = React.useContext(AuthContext);

    const initialValues = {
        folderName: "",
    }

    const validationSchema = Yup.object().shape({
        folderName: Yup.string().max(50).required(),
    })

    const submit = (submittedData: IFolderForm) => {
        fetch(`http://localhost:3000/api/v1/folders`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                accessToken: localStorage.getItem("accessToken")!,
            },
            body: JSON.stringify({
                newFolderName: submittedData.folderName,
                userId: authState.id
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.log(error));
    }

    
    return (
        <div className="edit_folder_container">

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {({ errors, touched }) => (
                    <Form className="edit_folder_form">

                        <div className="edit_folder_title_container">
                            <h1 className="edit_folder_title">Create a new folder</h1>

                            <AiOutlineCloseCircle className="edit_folder_close_btn" onClick={() => {setEditFolderPopUpOpen(false)}}></AiOutlineCloseCircle>
                        </div>

                        <div className="edit_folder_content_container">
                            <div className="edit_folder_details">
                                <label className="edit_folder_label required" htmlFor="">Folder name </label>
                                <Field className="edit_folder_field" name="folderName" type="text" />
                                {errors.folderName && touched.folderName ? <div className="edit_folder_field_errors">{errors.folderName}</div> : null}
                            </div>
                            <button className="edit_folder_button" type="submit">Edit</button>
                        </div>


                    </Form>
                )}
            </Formik>
        </div>
    );
}
