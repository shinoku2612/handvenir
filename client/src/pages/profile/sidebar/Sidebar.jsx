import React, { useEffect, useId, useRef, useState } from "react";
import MENU from "../../../config/menu.config";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import cx from "../../../utils/class-name";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getUser, getUserId } from "../../../redux/selectors";
import { AddAPhoto, Close } from "@mui/icons-material";
import { updateAvatarService } from "../../../services/user.service";
import Loader from "../../../components/Loader/Loader";

export default function Sidebar() {
    // [STATES]
    const user = useSelector(getUser);
    const userId = useSelector(getUserId);
    const isLoading = useSelector(getIsLoading);
    const dispatch = useDispatch();
    const avatarId = useId();
    const [imageSrc, setImageSrc] = useState("");
    const fileRef = useRef();

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imageSrc);
        };
    }, [imageSrc]);

    function handleChangeFile(event) {
        fileRef.current = event.target.files[0];
        const imageURL = URL.createObjectURL(fileRef.current);
        setImageSrc(imageURL);
    }
    async function handleSubmitAvatar() {
        try {
            if (fileRef.current) {
                const formData = new FormData();
                formData.append("file", fileRef.current);
                setImageSrc("");
                await updateAvatarService(userId, dispatch, formData);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    // [RENDER]
    return (
        <>
            {isLoading ? <Loader variant="overlay" /> : null}
            <div className={styles.sidebar}>
                <div className={styles.sidebarTop}>
                    <div className={styles.avatarContainer}>
                        <img
                            className={styles.avatar}
                            src={user.avatar}
                            alt="User avatar"
                        />
                        <label
                            htmlFor={avatarId}
                            className={styles.avatarPicker}
                        >
                            <AddAPhoto className={styles.icon} />
                        </label>
                        <input
                            key={imageSrc}
                            id={avatarId}
                            type="file"
                            accept="image/*"
                            className="hide"
                            onInput={handleChangeFile}
                        />
                    </div>
                    <div
                        className={cx("overlay", "flex-center", {
                            hide: !imageSrc,
                        })}
                    >
                        <div className={styles.imagePreview}>
                            <div className={styles.imagePreviewHeader}>
                                <h3 className="text-center">Update avatar</h3>
                                <div
                                    className={cx(
                                        styles.headerIcon,
                                        "flex-center",
                                    )}
                                    onClick={() => setImageSrc("")}
                                >
                                    <Close />
                                </div>
                            </div>
                            <div className={styles.imagePreviewBody}>
                                <img
                                    src={imageSrc}
                                    alt=""
                                    className={styles.image}
                                />
                            </div>
                            <div className={styles.imagePreviewFooter}>
                                <div
                                    className="btn btn-primary btn-rounded btn-outlined  m-inline-2"
                                    onClick={() => setImageSrc("")}
                                >
                                    Cancel
                                </div>
                                <div
                                    className="btn btn-primary btn-rounded"
                                    onClick={handleSubmitAvatar}
                                >
                                    Save
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.nameContainer}>
                        <p className={styles.name}>{user?.name}</p>
                    </div>
                </div>
                <div className={styles.sidebarBottom}>
                    <div className={styles.menuContainer}>
                        {MENU.sidebar.map((menu) => (
                            <NavLink
                                key={menu.id}
                                to={menu.path}
                                end
                                className={({ isActive }) =>
                                    cx(styles.menuItem, {
                                        [styles.menuActive]: isActive,
                                    })
                                }
                            >
                                <img
                                    src={menu.image}
                                    alt=""
                                    className={styles.menuImage}
                                />
                                <p className={styles.menuTitle}>{menu.title}</p>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
