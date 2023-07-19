import React, { lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import cx from "../../utils/class-name";
import styles from "./Loader.module.css";
import errorSVG from "../../assets/images/error.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authentication.slice";
const Error = lazy(() => import("../../pages/error/Error"));

export default function Loader({ variant = "fill", timeOut, iconSrc }) {
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (timeOut) {
            const timeoutId = setTimeout(() => {
                setShowError(true);
            }, timeOut);
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [timeOut]);

    if (showError) {
        return (
            <Error
                title="Some thing went wrong"
                image={{ src: errorSVG, styles: { width: "35%" } }}
                message={{
                    header: "Some thing went wrong!",
                    info: "Maybe you did something wrong.",
                    suggest: "Please re-connect and try again",
                }}
                isChild
                navigator={{
                    target: "/auth",
                    title: "Go to login",
                    handler: () => {
                        dispatch(logout());
                    },
                }}
            />
        );
    }
    return ReactDOM.createPortal(
        <div className={cx(styles.loader, styles[variant])}>
            {iconSrc ? (
                <img
                    src={iconSrc}
                    alt=""
                    height="50%"
                />
            ) : (
                <div className={styles.loaderContainer}>
                    <span className={styles.loaderComponent}></span>
                    <span className={styles.loaderComponent}></span>
                    <span className={styles.loaderComponent}></span>
                    <span className={styles.loaderComponent}></span>
                </div>
            )}
        </div>,
        document.body,
    );
}
