import React, { useState } from 'react';
import cx from '../../../utils/class-name';
import styles from './Register.module.css';
import { Email, FacebookOutlined, Google, Lock } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import OTP from '../../../components/OTP/OTP';
import InputField from '../../../components/Form/InputField/InputField';
import Form from '../../../components/Form/Form';

export default function Register({ isSignUp, setIsSignUp }) {
    // [STATES]
    const [showOTP, setShowOTP] = useState(false);

    // [HANDLER FUNCTIONS]
    function handleSubmitForm() {
        console.log('Submitted');

        setShowOTP(true);
    }
    function handleRegister() {
        setIsSignUp(false);
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
                >
                    <Email />
                </InputField>
                <InputField
                    name="password"
                    type="password"
                    placeholder="Password *"
                    required
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
function FormFooter({ onClick }) {
    return (
        <React.Fragment>
            <button
                type="submit"
                className={cx('btn', 'btn-rounded', styles.solidBtn)}
                onClick={onClick}
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
