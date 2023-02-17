import { Chip } from '@mui/material';
import React from 'react';
import styles from './ProductsHeader.module.css';

export default function ProductsHeader({ criteria }) {
    return (
        <div className={styles.listHeader}>
            <div className={styles.filterCritetia}>
                {criteria.map((c) => (
                    <Chip
                        key={c}
                        label={c}
                        style={{
                            marginRight: '0.625rem',
                        }}
                        color="primary"
                        variant="outlined"
                    />
                ))}
            </div>
            <button
                className="btn btn-primary text-small"
                disabled={criteria.length === 0}
            >
                Search
            </button>
        </div>
    );
}
