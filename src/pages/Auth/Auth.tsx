import React from 'react'
import styles from "./Auth.module.scss";
import { Formik, Form, } from "formik";
import * as Yup from "yup";
import { FormSubmissionHandler, FormInputField } from '../../global/components/forms/fields/FormField';
import { FormUtils } from '../../utils/FormUtils';

type AuthFormValues = {
    email: string;
    password: string;
    passwordReEnter: string;
}

const AuthSchema: Yup.SchemaOf<AuthFormValues> = Yup.object().shape({
    email: FormUtils.emailValidation.required("Email Required"),
    password: FormUtils.passwordValidation.required("Password Required"),
    passwordReEnter: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please re-enter your password")
})

export default function Auth() {
    const initialValues: AuthFormValues = { email: "", password: "", passwordReEnter: "" }

    const handleSubmit: FormSubmissionHandler<AuthFormValues> = (values, { setSubmitting }) => {
        console.log(values);
    }

    return (
        <div className={styles.auth}>
            <h1>Auth</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={AuthSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form
                        className={styles.authForm}
                        autoComplete={"on"}
                        noValidate
                    >
                        <FormInputField name={"email"} label={"Email"} classes={{ label: styles.authFormFieldLabel }}/>
                        <FormInputField name={"password"} type={"password"} label={"Password"} classes={{ label: styles.authFormFieldLabel }}/>
                        <FormInputField name={"passwordReEnter"} type={"password"} label={"Re-Enter Password"} classes={{ label: styles.authFormFieldLabel }}/>

                        <button type={"submit"} style={{ color: "white" }}>Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}