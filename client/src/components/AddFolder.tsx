import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as Yup from 'yup'
import "./Css/AddFolderPopUp.css"

export interface IAppProps {
    addFolderPopUpOpen: boolean;
}

export function AddFolder({ addFolderPopUpOpen }: IAppProps) {
    const initialValues = {
        folderName: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().max(50).required(),
    })

    const submit = () => {

    }

    const closeAddFolderPopUp = () => {

    }
    return (
        <div className="add_folder_container">

            <AiOutlineCloseCircle className="add_folder_close_btn" onClick={closeAddFolderPopUp}></AiOutlineCloseCircle>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {({ errors, touched }) => (
                    <Form className="add_folder_form">
                        <div className="add_folder_title_container">
                            <h1 className="add_folder_title">Create a new folder</h1>
                        </div>
                        <div className="add_folder_content_container">
                            <div className="add_folder_details">
                                <label className="add_folder_label required" htmlFor="">Folder name </label>
                                <Field className="add_folder_field" name="folderName" type="text" />
                                {errors.folderName && touched.folderName ? <div className="add_folder_field_errors">{errors.folderName}</div> : null}
                            </div>

                            <button className="add_folder_button" type="submit">Add</button>
                        </div>


                    </Form>
                )}
            </Formik>
        </div>
    );
}
