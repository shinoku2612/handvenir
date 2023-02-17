import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../../components/Select/Select';
import USER_INFO from '../../../../config/user.config';
import { getUser } from '../../../../redux/selectors';
import { setUser } from '../../../../redux/slice/user.slice';
import styles from './Information.module.css';

export default function Information() {
    // [STATES]
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [updatedUser, setUpdatedUser] = useState({ ...user });

    const [editable, setEditable] = useState(false);
    const [gender, setGender] = useState(user.gender);

    // [HANDLER FUNCTIONS]
    function handleUpdateUser(e) {
        const field = e.target.name;
        const value = e.target.value;
        setUpdatedUser((prev) => ({ ...prev, [field]: value }));
    }
    function handleSaveChange() {
        // Do something
        dispatch(setUser({ ...updatedUser, gender }));
        setEditable(false);
    }
    function handleCancelChange() {
        // Do something
        setEditable(false);
    }

    // [RENDER]
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.header}>Personal information</h3>
            <div className={styles.content}>
                {USER_INFO.personal.map((info) => (
                    <div key={info.id} className={styles.infoItem}>
                        <span className={styles.label}>{info.label}</span>
                        {editable ? (
                            <input
                                autoComplete="off"
                                name={info.id}
                                className={styles.input}
                                type={info.type}
                                value={updatedUser[info.id]}
                                onChange={handleUpdateUser}
                            />
                        ) : (
                            <p className={styles.input}>{user[info.id]}</p>
                        )}
                    </div>
                ))}
                <Select
                    editable={editable}
                    label="Gender"
                    defaultValue={gender}
                    renderData={['Male', 'Female']}
                    onSelect={setGender}
                />
            </div>
            <div className="btn-groups flex-center">
                {!editable ? (
                    <div
                        className="btn btn-rounded btn-primary"
                        onClick={() => setEditable(true)}
                    >
                        Edit information
                    </div>
                ) : (
                    <>
                        <div
                            className="btn btn-rounded btn-primary m-inline-1"
                            onClick={handleSaveChange}
                        >
                            Save changes
                        </div>
                        <div
                            className="btn btn-rounded btn-light m-inline-1"
                            onClick={handleCancelChange}
                        >
                            Cancel
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
