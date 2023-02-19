import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cx from '../../../utils/class-name';
import styles from './Login.module.css';
import { Email, FacebookOutlined, Google, Lock } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import InputField from '../../../components/Form/InputField/InputField';
import Form from '../../../components/Form/Form';
import OTP from '../../../components/OTP/OTP';
import { sendOTPService } from '../../../services/otp.service';
import { loginService } from '../../../services/authentication.service';

export default function Login({ isSignUp }) {
    // [STATES]
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // [HANDLER FUNCTIONS]
    async function handleSubmitForm() {
        try {
            const isOTPSent = await sendOTPService(
                { type: 'login', email },
                dispatch,
            );

            if (isOTPSent) setShowOTP(true);
        } catch (error) {
            console.log(error.message);
            setShowOTP(false);
        }
    }

    async function handleLogin(code) {
        try {
            const isLoggedIn = await loginService(
                { code, email, password },
                dispatch,
            );
            if (isLoggedIn) setShowOTP(false);
            else setShowOTP(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    // [RENDER]
    return (
        <React.Fragment>
            <Form
                onSubmit={handleSubmitForm}
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
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                    <Lock />
                </InputField>
            </Form>
            {showOTP && (
                <OTP
                    onSubmit={handleLogin}
                    onHideOTP={() => setShowOTP(false)}
                />
            )}
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
