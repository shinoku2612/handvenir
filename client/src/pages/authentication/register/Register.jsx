import React, { useState } from 'react';
import cx from '../../../utils/class-name';
import styles from './Register.module.css';
import { Email, FacebookOutlined, Google, Lock } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import OTP from '../../../components/OTP/OTP';
import InputField from '../../../components/Form/InputField/InputField';
import Form from '../../../components/Form/Form';
import { useDispatch } from 'react-redux';
import { sendOTPService } from '../../../services/otp.service';
import { registerService } from '../../../services/authentication.service';

export default function Register({ isSignUp, setIsSignUp }) {
    // [STATES]
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // [HANDLER FUNCTIONS]
    async function handleSubmitForm() {
        try {
            const isOTPSent = await sendOTPService(
                { type: 'register', email },
                dispatch,
            );

            if (isOTPSent) setShowOTP(true);
        } catch (error) {
            console.log(error.message);
            setShowOTP(false);
        }
    }
    async function handleRegister(code) {
        try {
            const isSignedUp = await registerService(
                { code, email, password },
                dispatch,
            );
            if (isSignedUp) {
                setShowOTP(false);
                setIsSignUp(false);
            } else setShowOTP(true);
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
                onSubmit={handleSubmitForm}
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
                <InputField
                    name="password"
                    type="password"
                    placeholder="Password *"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                    <Lock />
                </InputField>
            </Form>
            {showOTP && (
                <OTP
                    onSubmit={handleRegister}
                    onHideOTP={() => setShowOTP(false)}
                />
            )}
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
                className={cx('btn', 'btn-rounded', styles.solidBtn)}
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
