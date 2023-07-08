import React from "react";
import ReactDOM from "react-dom";
import cx from "../../utils/class-name";
import styles from "./Loader.module.css";

export default function Loader({ variant = "fill" }) {
    return ReactDOM.createPortal(
        <div className={cx(styles.loader, styles[variant])}>
            <div className={styles.loaderContainer}>
                <span className={styles.loaderComponent}></span>
                <span className={styles.loaderComponent}></span>
                <span className={styles.loaderComponent}></span>
                <span className={styles.loaderComponent}></span>
            </div>
        </div>,
        document.body,
    );
}
