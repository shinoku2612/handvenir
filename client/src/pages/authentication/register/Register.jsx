import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cx from "../../../utils/class-name";
import styles from "./Register.module.css";
import { Email, FacebookOutlined, Google } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import InputField from "../../../components/Form/InputField/InputField";
import Form from "../../../components/Form/Form";
import { sendRegisterLinkService } from "../../../services/authentication.service";

export default function Register({ isSignUp }) {
    // [STATES]
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    // [HANDLER FUNCTIONS]
    async function handleRegister() {
        try {
            await sendRegisterLinkService(email, dispatch);
        } catch (error) {
            console.log(error.message);
        }
    }

    // [RENDER]
    return (
        <React.Fragment>
            <Form
                validate
                defaultValidate={false}
                onSubmit={handleRegister}
                className={cx(styles.authForm, styles.signUpForm, {
                    [styles.signUpMode]: isSignUp,
                })}
                header={<FormHeader />}
                footer={<FormFooter />}
            >
                <InputField
                    name="email"
                    type="email"
                    placeholder="Email *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                    <Email />
                </InputField>
            </Form>
        </React.Fragment>
    );
}

// [CUSTOM RENDERED ELEMENTS]
function FormHeader() {
    return <h2 className={styles.title}>Sign up</h2>;
}
function FormFooter() {
    return (
        <React.Fragment>
            <button
                type="submit"
                className={cx("btn", "btn-rounded", styles.solidBtn)}
            >
                Sign up
            </button>
            <p className={styles.socialText}>
                or Sign up with social platforms
            </p>
            <div className={styles.socialMedia}>
                <NavLink className={styles.socialIcon}>
                    <FacebookOutlined />
                </NavLink>
                <NavLink className={styles.socialIcon}>
                    <Google />
                </NavLink>
            </div>
        </React.Fragment>
    );
}
