import * as Yup from "yup";

export class FormUtils {
    public static emailValidation = Yup.string().email("Enter a valid email address");

    public static passwordValidation = Yup.string()
        .min(8, "Password must be atleast 8 characters long")
        .matches(/(?=.*[A-Z])/, "Password must contain at least 1 uppercase letter")
        .matches(/(?=.*[a-z])/, "Password must contain at least 1 lowercase letter")
        .matches(/(?=.*\d)/, "Password must contain at least 1 number")
}