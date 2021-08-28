import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as Yup from 'yup'
import "../Css/AddEditSetPopUp.css"
import { ISetForm } from "../../helpers/Interfaces"

export interface IAppProps {
    setEditSetPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getSetList: () => Promise<void>;
    setId: number;
}

export function EditSetPopUp({ setEditSetPopUpOpen, getSetList, setId }: IAppProps) {
    
    const initialValues = {
        setName: "",
    }

    const validationSchema = Yup.object().shape({
        setName: Yup.string().max(50).required(),
    })

    const submit = (submittedData: ISetForm) => {
        console.log(submittedData)
        fetch("http://localhost:3000/api/v1/sets", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                accessToken: localStorage.getItem("accessToken")!,
            },
            body: JSON.stringify({
                newSetName: submittedData.setName,
                id: setId,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setEditSetPopUpOpen(false)
                getSetList()
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="edit_set_container">

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {({ errors, touched }) => (
                    <Form className="edit_set_form">

                        <div className="edit_set_title_container">
                            <h1 className="edit_set_title">Edit this set</h1>

                            <AiOutlineCloseCircle className="edit_set_close_btn" onClick={() => { setEditSetPopUpOpen(false) }}></AiOutlineCloseCircle>
                        </div>

                        <div className="edit_set_content_container">
                            <div className="edit_set_details">
                                <label className="edit_set_label required" htmlFor="">New Set Name </label>
                                <Field className="edit_set_field" name="setName" type="text" />
                                {errors.setName && touched.setName ? <div className="edit_set_field_errors">{errors.setName}</div> : null}
                            </div>
                            <button className="edit_set_button" type="submit">Edit</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
