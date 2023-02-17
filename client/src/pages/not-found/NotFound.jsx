import React, { useEffect } from 'react';
import styles from './NotFound.module.css';
import Header from '../../layouts/header/Header';
import pageNotFoundSVG from '../../assets/images/not-found.svg';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Not Found | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [RENDER]
    return (
        <React.Fragment>
            <Header />
            <div className={styles.pageNotFound}>
                <div className={styles.notFoundImageContainer}>
                    <img
                        src={pageNotFoundSVG}
                        alt="Page not found"
                        className={styles.notFoundImage}
                    />
                </div>
                <div className={styles.notFoundContentContainer}>
                    <h3 className={styles.notFoundTitle}>
                        Whoops! Lost in space?
                    </h3>
                    <p className={styles.notFoundInfo}>
                        The page you're looking for isn't found
                    </p>
                    <p className={styles.notFoundInfo}>
                        We suggest you back to home
                    </p>
                    <NavLink to="/" className="btn btn-primary mt-1">
                        Back to home
                    </NavLink>
                </div>
            </div>
        </React.Fragment>
    );
}
