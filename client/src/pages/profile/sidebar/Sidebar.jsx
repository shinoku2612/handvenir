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
import Cropper from "../../../components/Cropper/Cropper";

export default function Sidebar() {
    // [STATES]
    const user = useSelector(getUser);
    const userId = useSelector(getUserId);
    const isLoading = useSelector(getIsLoading);
    const dispatch = useDispatch();
    const avatarId = useId();
    const [imageSrc, setImageSrc] = useState("");
    const fileRef = useRef();
    const cropperRef = useRef();

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
            const croppedImageFile = await cropperRef.current.cropImage(
                cropperRef.current.canvas,
                cropperRef.current.context,
                cropperRef.current.source,
            );
            const formData = new FormData();
            formData.append("file", croppedImageFile);
            setImageSrc("");
            await updateAvatarService(userId, dispatch, formData);
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
                            onError={(e) => {
                                e.target.src = user.avatar;
                            }}
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
                    {imageSrc ? (
                        <div className="overlay flex-center">
                            <div className={styles.imagePreview}>
                                <div className={styles.imagePreviewHeader}>
                                    <h3 className="text-center">
                                        Update avatar
                                    </h3>
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
                                    <Cropper
                                        image={imageSrc}
                                        ref={cropperRef}
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
                    ) : null}
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
