import { Formik, Form, Field } from 'formik';
import * as React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import * as Yup from 'yup'
import "../Css/CustomTimerPopUp.css"
import { IAddForm, IAddFormCard, IAddFormFolder, IAddFormSet, ICustomTimerForm, IFolder } from "../../helpers/Interfaces"
import { useContext } from 'react';
import { AuthContext } from '../../helpers/Contexts';
export interface ICustomTimerPopUpProps {
    setCustomTimerPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTimer: (studyLength: number, breakLength: number) => void;
}

export function CustomTimerPopUp({setCustomTimerPopUpOpen, setTimer}: ICustomTimerPopUpProps) {
    const { authState } = useContext(AuthContext)
    const initialValues = {
        studyDuration: "",
        breakDuration: ""
    }

    const validationSchema = Yup.object().shape({
        studyDuration: Yup.number().required(),
        breakDuration: Yup.number().required(),
    })

    const submit = (submittedData: ICustomTimerForm) => {
        const { studyDuration, breakDuration } = submittedData
        setTimer(parseInt(studyDuration), parseInt(breakDuration))
    }

    return (
        <div className="custom_timer_container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submit}
            >
                {({ errors, touched }) => (
                    <Form className="custom_timer_form">
                        <div className="custom_timer_title_container">
                            <h1 className="custom_timer_title">Create a custom timer</h1>
                            <AiOutlineCloseCircle className="custom_timer_close_btn" onClick={() => { setCustomTimerPopUpOpen(false) }}></AiOutlineCloseCircle>
                        </div>

                        <div className="custom_timer_content_container">

                            <div className="
                            custom_timer_details">
                                <label className="custom_timer_label required" htmlFor="">Study time (minutes):</label>
                                <Field className="custom_timer_field" name="studyDuration" type="text" />
                                {errors.studyDuration && touched.studyDuration ? <div className="custom_timer_field_errors">{errors.studyDuration}</div> : null}
                            </div>
                            <div className="custom_timer_details">
                                <label className="custom_timer_label required" htmlFor="">Break time (minutes):</label>
                                <Field className="custom_timer_field" name="breakDuration" type="text" />
                                {errors.breakDuration && touched.breakDuration ? <div className="custom_timer_field_errors">{errors.breakDuration}</div> : null}
                            </div>
                            <button className="custom_timer_button" type="submit">Add</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

