import React from 'react';
import styles from './Credit.module.css';

export default function Credit() {
    // [RENDER]
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.header}>My credits</h3>
            <div className={styles.content}>
                <p style={{ textAlign: 'center' }}>Coming soon...</p>
            </div>
        </div>
    );
}
