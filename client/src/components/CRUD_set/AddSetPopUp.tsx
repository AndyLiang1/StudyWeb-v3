import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as Yup from 'yup'
import "../Css/AddEditSetPopUp.css"
import { ISetForm } from "../../helpers/Interfaces"

export interface IAppProps {
    setAddSetPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddSetPopUp({ setAddSetPopUpOpen }: IAppProps) {
    const initialValues = {
        setName: "",
    }

    const validationSchema = Yup.object().shape({
        setName: Yup.string().max(50).required(),
    })

    const submit = (submittedData: ISetForm) => {
        console.log(submittedData)
    }

    const closeAddSetPopUp = () => {

    }

    return (
        <div className="add_set_container">

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {({ errors, touched }) => (
                    <Form className="add_set_form">

                        <div className="add_set_title_container">
                            <h1 className="add_set_title">Create a new set</h1>

                            <AiOutlineCloseCircle className="add_set_close_btn" onClick={() => { setAddSetPopUpOpen(false) }}></AiOutlineCloseCircle>
                        </div>

                        <div className="add_set_content_container">
                            <div className="add_set_details">
                                <label className="add_set_label required" htmlFor="">Set name </label>
                                <Field className="add_set_field" name="setName" type="text" />
                                {errors.setName && touched.setName ? <div className="add_set_field_errors">{errors.setName}</div> : null}
                            </div>
                            <button className="add_set_button" type="submit">Add</button>
                        </div>


                    </Form>
                )}
            </Formik>
        </div>
    );
}
