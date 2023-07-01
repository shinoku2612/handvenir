import React, { useState } from "react";
import cx from "../../../utils/class-name";
import styles from "./Login.module.css";
import { Email, FacebookOutlined, Google } from "@mui/icons-material";
import InputField from "../../../components/Form/InputField/InputField";
import Form from "../../../components/Form/Form";
import { useDispatch } from "react-redux";
import { sendLoginLinkService } from "../../../services/authentication.service";

export default function Login({ isSignUp }) {
    // [STATES]
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    // [HANDLER FUNCTIONS]
    async function handleLogin() {
        try {
            await sendLoginLinkService(email, dispatch);
        } catch (error) {
            console.log(error.message);
        }
    }

    // [RENDER]
    return (
        <React.Fragment>
            <Form
                onSubmit={handleLogin}
                className={cx(styles.authForm, styles.signInForm, {
                    [styles.signUpMode]: isSignUp,
                })}
                header={<FormHeader />}
                footer={<FormFooter />}
            >
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                    <Email />
                </InputField>
            </Form>
        </React.Fragment>
    );
}

// [CUSTOM RENDERED COMPONENTS]
function FormHeader() {
    return <h2 className={styles.title}>Sign in</h2>;
}
function FormFooter() {
    return (
        <React.Fragment>
            <button
                type="submit"
                className={cx("btn", "btn-rounded", styles.solidBtn)}
            >
                Login
            </button>
            <p className={styles.socialText}>
                or Sign in with social platforms
            </p>
            <div className={styles.socialMedia}>
                <div className={styles.socialIcon}>
                    <FacebookOutlined />
                </div>
                <div className={styles.socialIcon}>
                    <Google />
                </div>
            </div>
        </React.Fragment>
    );
}
