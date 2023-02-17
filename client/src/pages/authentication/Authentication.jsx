import React, { useEffect, useState } from 'react';
import styles from './Authentication.module.css';
import loginSVG from '../../assets/images/login.svg';
import registerSVG from '../../assets/images/register.svg';
import cx from '../../utils/class-name';
import Login from './login/Login';
import Register from './register/Register';
import Header from '../../layouts/header/Header';

export default function Authentication() {
    // [STATES]
    const [isSignUp, setIsSignUp] = useState(false);

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        const pageTitle = isSignUp
            ? `Register | ${process.env.REACT_APP_SITE_TITLE}`
            : `Login | ${process.env.REACT_APP_SITE_TITLE}`;
        document.title = pageTitle;
    }, [isSignUp]);

    // [RENDER]
    return (
        <React.Fragment>
            <Header />
            <div
                className={cx(styles.authentication, {
                    [styles.signUpMode]: isSignUp,
                })}
            >
                <div className={styles.formContainer}>
                    <div className={styles.formSwitch}>
                        <Login isSignUp={isSignUp} />
                        <Register
                            isSignUp={isSignUp}
                            setIsSignUp={setIsSignUp}
                        />
                    </div>
                </div>

                <div className={styles.panelContainer}>
                    <div className={cx(styles.panel, styles.leftPanel)}>
                        <div className={styles.content}>
                            <h3 className={styles.greeting}>
                                Welcome to our platform!
                            </h3>
                            <p className={styles.description}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Omnis mollitia quas numquam.
                            </p>
                            <button
                                className={cx(
                                    'btn',
                                    'btn-rounded',
                                    styles.transparentBtn,
                                )}
                                onClick={() => setIsSignUp(true)}
                            >
                                Sign up
                            </button>
                        </div>
                        <img
                            src={loginSVG}
                            alt="Rocket SVG"
                            className={styles.image}
                        />
                    </div>

                    <div className={cx(styles.panel, styles.rightPanel)}>
                        <div className={styles.content}>
                            <h3 className={styles.greeting}>
                                To be one of us?
                            </h3>
                            <p className={styles.description}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Omnis mollitia quas numquam.
                            </p>
                            <button
                                className={cx(
                                    'btn',
                                    'btn-rounded',
                                    styles.transparentBtn,
                                )}
                                onClick={() => setIsSignUp(false)}
                            >
                                Sign in
                            </button>
                        </div>
                        <img
                            src={registerSVG}
                            alt="Desk SVG"
                            className={styles.image}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
