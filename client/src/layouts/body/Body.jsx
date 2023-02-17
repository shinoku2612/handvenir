import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Body.module.css';

export default function Body() {
    return (
        <main className={styles.body}>
            <Outlet />
        </main>
    );
}
