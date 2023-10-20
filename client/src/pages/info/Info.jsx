import React, { useEffect } from "react";
import styles from "./Info.module.css";
import Header from "../../layouts/header/Header";
import { NavLink } from "react-router-dom";
import cx from "../../utils/class-name";

export default function Info({
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
            <div className={cx(styles.infoPage, { [styles.child]: isChild })}>
                <div className={styles.infoImageContainer}>
                    <img
                        src={image.src}
                        alt={title}
                        className={styles.infoImage}
                        style={image.styles}
                    />
                </div>
                <div className={styles.infoContentContainer}>
                    <h3 className={styles.infoTitle}>{message.header}</h3>
                    <p className={styles.infoMessage}>{message.info}</p>
                    <p className={styles.infoMessage}>{message.suggest}</p>
                    {navigator ? (
                        <NavLink
                            to={navigator.target}
                            className="btn btn-primary mt-1"
                            onClick={navigator.handler}
                        >
                            {navigator.title}
                        </NavLink>
                    ) : null}
                </div>
            </div>
        </React.Fragment>
    );
}
