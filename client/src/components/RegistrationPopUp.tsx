import * as React from 'react';
import { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import "./Css/RegistrationPopUp.css"
import { AiOutlineCloseCircle } from "react-icons/ai";


import { IRegistrationForm } from '../helpers/Interfaces'
import { Dispatch, SetStateAction } from 'react';

interface Props{
    regPopUpOpen: boolean;
    setRegPopUpOpen: Dispatch<SetStateAction<boolean>>;
}
export function RegistrationPopUp({regPopUpOpen, setRegPopUpOpen}: Props) {
    const [badLogin, setBadLogin] = useState<boolean>(false)
    const initialValues: IRegistrationForm = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().max(50).required(),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    })

    /**
     * This function allows a user to register.
     * @param {SubmittedData} submittedData information of the user that is logging in
     */
    const signUp = (submittedData: IRegistrationForm) => {
        const { name, email, password, passwordConfirmation } = submittedData
        const emailLowerCase = email.toLowerCase()
        fetch("http://localhost:3000/api/v1/users/signup", {
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: emailLowerCase,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    
                } else {
                    
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const googleSuccess = async (res: any) => {
        const result = res?.profileObj; // if DNE, no error, result just  
        // just gonna be DNE 
        const { givenName, email, googleId } = result
        const emailLowerCase = email.toLowerCase()
        const name = givenName
        fetch("http://localhost:3000/api/v1/users/google_auth", {
            mode: 'cors',
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: emailLowerCase,
                password: googleId
            })
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    console.log('success!', data)
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const googleFailure = (error: any) => {
        console.log(error)
        console.log('Google success failed.')
    }

    const closeRegPopUp = ():void => {
        setRegPopUpOpen(false)
    }
    return (
        <div className="sign_up_page">
            <div className="image_side">

            </div>
            <div className="sign_up_side">
                <AiOutlineCloseCircle className = "sign_up_close_btn" onClick = {closeRegPopUp}></AiOutlineCloseCircle>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={signUp}
                >
                    {({ errors, touched }) => (
                        <Form className="sign_up_form">
                            <h1 className="sign_up_title">Register today!</h1>
                            <div className="sign_up_details">
                                <label className="sign_up_label required" htmlFor="">Name</label>
                                <Field className="sign_up_field" name="name" type="text" />
                                {errors.name && touched.name ? <div className="sign_up_field_errors">{errors.name}</div> : null}
                            </div>

                            <div className="sign_up_details">
                                <label className="sign_up_label required" htmlFor="">Email </label>
                                <Field className="sign_up_field" name="email" type="email" />
                                {errors.email && touched.email ? <div className="sign_up_field_errors">{errors.email}</div> : null}
                            </div>

                            <div className="sign_up_details">
                                <label className="sign_up_label required" htmlFor="">Password </label>
                                <Field className="sign_up_field" name="password" type="password" />
                                {errors.password && touched.password ? (
                                    <div className="sign_up_field_errors">{errors.password}</div>
                                ) : null}
                            </div>
                            <div className="sign_up_details">
                                <label className="sign_up_label required" htmlFor="">Confirm Password </label>
                                <Field className="sign_up_field" name="passwordConfirmation" type="password" />
                                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                                    <div className="sign_in_field_errors">{errors.passwordConfirmation}</div>
                                ) : null}
                            </div>

                            {badLogin ? (
                                <div>
                                    <h1 className="sign_up_message" id="sign_up_message_id">{ }</h1>
                                </div>
                            ) : null}

                            <button className="sign_up_button" type="submit">Sign up</button>

                            <GoogleLogin
                                clientId="817144640879-lu721n4hbhffop5e60iqdk31f3f1e4d4.apps.googleusercontent.com"
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} className='g-sign-in-button'>
                                        <div className='content-wrapper'>
                                            <div className='logo-wrapper'>
                                                <img src='https://developers.google.com/identity/images/g-logo.png'></img>
                                            </div>
                                            <span className='text-container'>
                                                <span>Sign up with Google</span>
                                            </span>
                                        </div>
                                    </button>)}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                                className="sign_up_Google"
                            ></GoogleLogin>


                        </Form>
                    )}
                </Formik>




            </div>
        </div>
    );
}
