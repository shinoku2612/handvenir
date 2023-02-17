import { Search } from '@mui/icons-material';
import React from 'react';
import { useId } from 'react';
import cx from '../../../utils/class-name';
import styles from './SearchBar.module.css';

export default function SearchBar({ children, ...props }) {
    const inputId = useId();
    return (
        <div className={styles.searchBar} {...props}>
            <label htmlFor={inputId} className={styles.iconContainer}>
                <Search className={styles.icon} />
            </label>
            <input
                autoComplete="off"
                id={inputId}
                type="text"
                className={styles.searchField}
                placeholder="Find your love..."
            />
            <div className={cx('btn btn-rounded', styles.searchBtn)}>
                Search
            </div>
        </div>
    );
}
