import * as React from 'react';
import { useState } from 'react';
import GoogleLogin from 'react-google-login';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import "./Css/LoginPopUp.css"

import { ILoginForm } from "../helpers/Interfaces"

export function LoginPopUp() {
    const [badLogin, setBadLogin] = useState<boolean>(false)
    const initialValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().max(50).required(),
    })

    const onSubmit = (data: any) => {
        console.log(data)
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
    return (
        <div className="sign_in_page">
            {/* <div className="image_side">

            </div> */}
            <div className="sign_in_side">
                <button className = "sign_in_exit_btn">Exit</button>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="sign_in_form">
                            <h1 className="sign_in_title">Log in</h1>
                            <div className="sign_in_details">
                                <label className="sign_in_label required" htmlFor="">Email </label>
                                <Field className="sign_in_field" name="email" type="email" />
                                {errors.email && touched.email ? <div className="sign_in_field_errors">{errors.email}</div> : null}
                            </div>

                            <div className="sign_in_details">
                                <label className="sign_in_label required" htmlFor="">Password </label>
                                <Field className="sign_in_field" name="password1" type="password" />
                                {errors.password && touched.password ? (
                                    <div className="sign_in_field_errors">{errors.password}</div>
                                ) : null}
                            </div>

                            {badLogin ? (
                                <div>
                                    <h1 className="sign_in_message" id="sign_in_message_id">{ }</h1>
                                </div>
                            ) : null}

                            <button className="sign_in_button" type="submit">Log in</button>

                            <GoogleLogin
                                clientId="817144640879-lu721n4hbhffop5e60iqdk31f3f1e4d4.apps.googleusercontent.com"
                                render={renderProps => (
                                    <button onClick={renderProps.onClick} className='g-sign-in-button'>
                                        <div className='content-wrapper'>
                                            <div className='logo-wrapper'>
                                                <img src='https://developers.google.com/identity/images/g-logo.png'></img>
                                            </div>
                                            <span className='text-container'>
                                                <span>Sign in with Google</span>
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
