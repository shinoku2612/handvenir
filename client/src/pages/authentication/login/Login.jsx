import React from 'react';
import cx from '../../../utils/class-name';
import styles from './Login.module.css';
import { Email, FacebookOutlined, Google, Lock } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import InputField from '../../../components/Form/InputField/InputField';
import Form from '../../../components/Form/Form';

export default function Login({ isSignUp }) {
    // [HANDLER FUNCTIONS]
    function handleLogin() {
        console.log('Submit');
    }

    // [RENDER]
    return (
        <Form
            onSubmit={handleLogin}
            className={cx(styles.authForm, styles.signInForm, {
                [styles.signUpMode]: isSignUp,
            })}
            header={<FormHeader />}
            footer={<FormFooter />}
        >
            <InputField type="email" placeholder="Email">
                <Email />
            </InputField>
            <InputField type="password" placeholder="Password">
                <Lock />
            </InputField>
        </Form>
    );
}

// [CUSTOM RENDERED COMPONENTS]
function FormHeader() {
    return <h2 className={styles.title}>Sign in</h2>;
}
function FormFooter() {
    return (
        <React.Fragment>
            <NavLink className={styles.forgotPassword}>
                Forgot Password?
            </NavLink>
            <button
                type="submit"
                className={cx('btn', 'btn-rounded', styles.solidBtn)}
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
