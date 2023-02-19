import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './OTP.module.css';
import { KeyboardBackspaceOutlined } from '@mui/icons-material';
import { OTP_LIFE_TIME } from '../../config/constant.config';
import { hideEmail } from '../../utils/helper';

export default function OTP({ onSubmit, onHideOTP }) {
    // [STATES]
    const [code, setCode] = useState([]);
    const [lifeTime, setLifeTime] = useState(OTP_LIFE_TIME);

    // [SIDE EFFECTS]
    // --Countdown OTP life time--
    useEffect(() => {
        let timerId;
        timerId = setTimeout(() => {
            if (lifeTime > 0) setLifeTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [lifeTime]);

    // [HANDLER FUNCTIONS]
    function handleInputOTP(e) {
        if (!/(?=.*\d)/.test(e.target.value)) return;
        if (code.length < 6) {
            setCode((prevCode) => [...prevCode, e.target.value]);
        }
        if (e.target.nextSibling) e.target.nextSibling.focus();
    }
    function handleClearOTP(e) {
        if (e.keyCode !== 8) return;
        if (code.length > 0) {
            setCode((prevCode) => prevCode.slice(0, -1));
        }
        if (e.target.value === '' && e.target.previousSibling)
            e.target.previousSibling.focus();
    }

    function handleSubmitOTP(e) {
        e.preventDefault();
        onSubmit(code.join(''));
    }

    // [RENDER]
    return ReactDOM.createPortal(
        <div className={styles.otpContainer}>
            <form className={styles.otpArea} onSubmit={handleSubmitOTP}>
                <div className={styles.otpHeader}>
                    <div className={styles.backArrow} onClick={onHideOTP}>
                        <KeyboardBackspaceOutlined
                            htmlColor="#dc3545"
                            style={{ lineHeight: 0 }}
                        />
                    </div>
                    <p className={styles.otpHeaderTitle}>
                        Enter verification code!
                    </p>
                </div>
                <div className={styles.otpSubHeader}>
                    Verification code was sent to
                    <p className={styles.otpOwnerEmail}>
                        {hideEmail('shinoku1801@gmail.com')}
                    </p>
                </div>
                <div className={styles.otpInput}>
                    {new Array(6).fill(6).map((ele, i) => (
                        <input
                            key={i}
                            type="text"
                            className={styles.otpCell}
                            maxLength="1"
                            value={code[i] || ''}
                            onChange={handleInputOTP}
                            onKeyUp={handleClearOTP}
                            autoFocus={i === 0}
                        />
                    ))}
                </div>
                {lifeTime > 0 ? (
                    <div className={styles.otpTime}>
                        You can resend the code after:{' '}
                        <p className={styles.time}>{lifeTime}s</p>
                    </div>
                ) : (
                    <div className={styles.otpExpired}>
                        Oops, this code has been expired!
                        <p className={styles.otpResend}>Resend your code</p>
                    </div>
                )}
                <button
                    className="btn btn-danger"
                    disabled={code.length < 6 || lifeTime === 0}
                    type="submit"
                >
                    Confirm
                </button>
            </form>
        </div>,
        document.body,
    );
}
