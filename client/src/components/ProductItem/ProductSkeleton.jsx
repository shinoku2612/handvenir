import React from 'react';
import styles from './ProductItem.module.css';
import { Skeleton } from '@mui/material';

export default function ProductSkeletion() {
    // [RENDER]
    return (
        <div className={styles.productItem}>
            <div className={styles.imageContainer}>
                <Skeleton
                    variant="rectangular"
                    className={styles.productImage}
                    sx={{ height: '100%' }}
                ></Skeleton>
            </div>
            <div className={styles.productInfo}>
                <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem' }}
                    width="100%"
                />
            </div>
            <p className={styles.productDescription}>
                <Skeleton variant="text" sx={{ fontSize: '1.75rem' }} />
            </p>
            <div className={styles.productRating}>
                <Skeleton variant="rounded" width="70%" />
            </div>
            <div className={styles.actionContainer}>
                <Skeleton variant="rounded" width="50%" height={42} />
            </div>
        </div>
    );
}
