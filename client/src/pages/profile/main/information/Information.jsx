import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../../components/Select/Select';
import USER_INFO from '../../../../config/user.config';
import { getUserId } from '../../../../redux/selectors';
import { getUserService } from '../../../../services/user.service';
import styles from './Information.module.css';

export default function Information() {
    // [STATES]
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    const { isLoading, data: user } = useQuery(['user', userId], () =>
        getUserService(userId, dispatch),
    );
    // console.log(user);
    const [editable, setEditable] = useState(false);
    const [gender, setGender] = useState('');

    // [HANDLER FUNCTIONS]
    function handleSaveChange() {
        // Do something
        setEditable(false);
    }
    function handleCancelChange() {
        // Do something
        setGender(user.gender);
        setEditable(false);
    }

    if (isLoading) return <h3>Loading...</h3>;

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
                                value={
                                    info.type === 'date'
                                        ? new Date(user[info.id]).toISOString().slice(0, 10)
                                        : user[info.id]
                                }
                                onChange={() => {}}
                            />
                        ) : (
                            <p className={styles.input}>
                                {info.type === 'date'
                                    ? new Intl.DateTimeFormat().format(
                                          new Date(user[info.id]),
                                      )
                                    : user[info.id] || 'Not updated yet'}
                            </p>
                        )}
                    </div>
                ))}
                <Select
                    editable={editable}
                    label="Gender"
                    defaultValue={gender || user.gender}
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
