import React from 'react';
import USER_INFO from '../../../../config/user.config';
import styles from './Password.module.css';
import { useNavigate } from 'react-router-dom';

export default function Password() {
    // [STATES]
    const navigate = useNavigate();

    // [HANDLER FUNCTIONS]
    function handleCancelChange() {
        navigate('/me');
    }

    // [RENDER]
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.header}>Change password</h3>
            <div className={styles.content}>
                {USER_INFO.password.map((info) => (
                    <div key={info.id} className={styles.infoItem}>
                        <span className={styles.label}>{info.label}</span>
                        <input
                            autoComplete="off"
                            name={info.id}
                            className={styles.input}
                            type={info.type}
                        />
                    </div>
                ))}
            </div>
            <div className="btn-groups flex-center">
                <div className="btn btn-rounded btn-primary m-inline-1">
                    Save changes
                </div>
                <div
                    className="btn btn-rounded btn-light m-inline-1"
                    onClick={handleCancelChange}
                >
                    Cancel
                </div>
            </div>
        </div>
    );
}
