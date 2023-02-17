import React from 'react';
import styles from './Category.module.css';

export default function Category({ label, action, onClearFilter, children }) {
    return (
        <div className={styles.category}>
            <div className={styles.categoryHeader}>
                <p className={styles.headerTitle}>{label}</p>
                <div className={styles.actionButton} onClick={onClearFilter}>
                    {action}
                </div>
            </div>
            {children}
        </div>
    );
}
