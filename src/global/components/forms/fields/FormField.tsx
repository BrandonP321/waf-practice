import classNames from 'classnames';
import { ErrorMessage, Field, FieldConfig, FormikHelpers, useFormikContext } from 'formik';
import React, { useState } from 'react'
import { ClassesProp } from '../../../../utils/helpers';
import styles from "./FormField.module.scss";

export type FormSubmissionHandler<TFormValues extends {}> = (values: TFormValues, formikHelpers: FormikHelpers<TFormValues>) => void;

/** Universal field types */
export type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    classes?: ClassesProp<"root" | "field" | "label" | "errorMsg" | "hasError" | "isFocused" | "hasValue">;
    /** Allows a <textarea> to be resized vertically.  Defaults to false */
    allowResize?: boolean;
}

export type FormInputFieldProps = FormFieldProps & {
    as?: FieldConfig["as"];
}

export const FormInputField = (props: FormInputFieldProps) => {
    const {
        name, label: fieldLabel, id, classes, allowResize, ...inputProps
    } = props;

    const { errors, touched, values, handleBlur } = useFormikContext<{ [key: string]: any }>();

    const [isFocused, setIsFocused] = useState(false);

    /** Field is considered to have an error only after being visited */
    const hasError = !!errors[name] && !!touched[name];
    const hasValue = !!values[name];

    const onBlur = (e: React.FocusEvent) => {
        handleBlur(e);
        setIsFocused(false);
    }

    const wrapperClassName = classNames(
        styles.formFieldWrapper, 
        classes?.root, 
        hasError && classNames(styles.error, classes?.hasError), 
        isFocused && classNames(styles.focused, classes?.isFocused), 
        hasValue && classNames(styles.hasValue, classes?.hasValue)
    )

    return (
        <div className={wrapperClassName}>
            <label className={classNames(styles.inputLabel, classes?.label)} htmlFor={id ?? name}>{fieldLabel}</label>
            <Field 
                {...inputProps}
                className={classNames(styles.inputField, classes?.field, allowResize && styles.allowResize)}
                name={name}
                id={id ?? name}
                onFocus={() => setIsFocused(true)}
                onBlur={onBlur}
            />
            <ErrorMessage name={name} render={(msg) => <p className={classNames(styles.errMsg, classes?.errorMsg)}>{msg}</p>}/>
        </div>
    )
}

export type FormTextareaFieldProps = FormFieldProps & {
}

export const FormTextareaField = (props: FormTextareaFieldProps) => {

    return (
        <FormInputField {...props} as={"textarea"}/>
    )
}