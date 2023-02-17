import React from 'react';
import styles from './ShopList.module.css';

export default function ShopList() {
    // [RENDER]
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.header}>My shops</h3>
            <div className={styles.content}>
                <p style={{ textAlign: 'center' }}>Coming soon...</p>
            </div>
        </div>
    );
}
