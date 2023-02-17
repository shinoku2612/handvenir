import { Radio } from '@mui/material';
import React from 'react';
import { SORT } from '../../../../config/constant.config';
import styles from './Sort.module.css';

export default function Sort({ sortCriteria, onSetSortCriteria }) {
    return (
        <div className={styles.sortListContainer}>
            <div className={styles.sortList}>
                {SORT.map((sort) => (
                    <div
                        key={sort.label}
                        className={styles.sortItem}
                        onClick={() => onSetSortCriteria(sort.label)}
                    >
                        <Radio checked={sortCriteria === sort.label} />
                        <div className={styles.sortValue}>{sort.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
