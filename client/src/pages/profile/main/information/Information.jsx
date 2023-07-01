import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../../../components/Select/Select";
import USER_INFO from "../../../../config/user.config";
import { getUser, getUserId } from "../../../../redux/selectors";
import { updateUserService } from "../../../../services/user.service";
import styles from "./Information.module.css";

export default function Information() {
    // [STATES]
    const userId = useSelector(getUserId);
    const user = useSelector(getUser);
    const infoRef = useRef(null);
    const dispatch = useDispatch();

    const [editable, setEditable] = useState(false);
    const [gender, setGender] = useState(user.gender);

    // [HANDLER FUNCTIONS]
    function getRefMap() {
        if (!infoRef.current) {
            infoRef.current = new Map();
        }
        return infoRef.current;
    }
    async function handleSaveChange() {
        try {
            const refMap = getRefMap();
            const userInfo = {};
            USER_INFO.personal.forEach((info) => {
                const id = info.id;
                const node = refMap.get(id);
                userInfo[id] = node.value;
            });
            userInfo.gender = gender || user.gender;
            const result = await updateUserService(userId, dispatch, userInfo);
            if (result) setEditable(false);
        } catch (error) {
            console.log(error.message);
        }
    }
    function handleCancelChange() {
        setGender(user.gender);
        setEditable(false);
    }

    // if (isLoading) return <h3>Loading...</h3>;

    // [RENDER]
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.header}>Personal information</h3>
            <div className={styles.content}>
                {USER_INFO.personal.map((info) => (
                    <div
                        key={info.id}
                        className={styles.infoItem}
                    >
                        <span className={styles.label}>{info.label}</span>
                        {editable ? (
                            <input
                                autoComplete="off"
                                name={info.id}
                                className={styles.input}
                                type={info.type}
                                defaultValue={
                                    info.type === "date"
                                        ? new Date(user[info.id])
                                              .toISOString()
                                              .slice(0, 10)
                                        : user[info.id]
                                }
                                ref={(node) => {
                                    const refMap = getRefMap();
                                    if (node) refMap.set(info.id, node);
                                    else refMap.delete(info.id);
                                }}
                            />
                        ) : (
                            <p className={styles.input}>
                                {info.type === "date"
                                    ? new Intl.DateTimeFormat().format(
                                          new Date(user[info.id]),
                                      )
                                    : user[info.id] || "Not updated yet"}
                            </p>
                        )}
                    </div>
                ))}
                <Select
                    editable={editable}
                    label="Gender"
                    defaultValue={gender || user.gender}
                    renderData={["Male", "Female", "Others"]}
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
