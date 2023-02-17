import React from 'react';
import cx from '../../utils/class-name';
import styles from './Loader.module.css';

export default function Loader({ variant = 'fill' }) {
    return (
        <div className={cx(styles.loader, styles[variant])}>
            <div className={styles.loaderContainer}>
                <span className={styles.loaderComponent}></span>
                <span className={styles.loaderComponent}></span>
                <span className={styles.loaderComponent}></span>
                <span className={styles.loaderComponent}></span>
            </div>
        </div>
    );
}
