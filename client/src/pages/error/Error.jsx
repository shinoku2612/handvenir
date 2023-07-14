import React, { useEffect } from "react";
import styles from "./Error.module.css";
import Header from "../../layouts/header/Header";
import { NavLink } from "react-router-dom";
import cx from "../../utils/class-name";

export default function Error({
    image,
    title,
    message,
    navigator,
    isChild = false,
}) {
    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        if (!isChild) {
            document.title = `${title} | ${process.env.REACT_APP_SITE_TITLE}`;
        }
    }, [isChild, title]);

    // [RENDER]
    return (
        <React.Fragment>
            {isChild ? null : <Header />}
            <div className={cx(styles.errorPage, { [styles.child]: isChild })}>
                <div className={styles.errorImageContainer}>
                    <img
                        src={image.src}
                        alt={title}
                        className={styles.errorImage}
                        style={image.styles}
                    />
                </div>
                <div className={styles.errorContentContainer}>
                    <h3 className={styles.errorTitle}>{message.header}</h3>
                    <p className={styles.errorInfo}>{message.info}</p>
                    <p className={styles.errorInfo}>{message.suggest}</p>
                    {navigator ? (
                        <NavLink
                            to={navigator.target}
                            className="btn btn-primary mt-1"
                        >
                            {navigator.title}
                        </NavLink>
                    ) : null}
                </div>
            </div>
        </React.Fragment>
    );
}
