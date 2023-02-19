import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import DefaultMenu from './default/DefaultMenu';
import ResponsiveMenu from './responsive/ResponsiveMenu';
import SearchBar from './search-bar/SearchBar';
import { useSelector } from 'react-redux';
import { getUserId } from '../../redux/selectors';

export default function Header() {
    // [STATES]
    const userId = useSelector(getUserId);
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [isResponsive, setIsResponsive] = useState(false);

    // [SIDE EFFECTS]
    useEffect(() => {
        function handleResize() {
            setScreenSize(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return function () {
            window.removeEventListener('resize', handleResize);
        };
    });
    useEffect(() => {
        if (screenSize <= 480) setIsResponsive(true);
        else setIsResponsive(false);
    }, [screenSize]);

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerRow}>
                    <div className={styles.headerLeft}>
                        <NavLink to="/" className={styles.logo}>
                            <img
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                alt=""
                                className={styles.logoImg}
                            />
                            <span className={styles.logoName}>ShinPay</span>
                        </NavLink>
                    </div>
                    <div className={styles.headerCenter}>
                        <SearchBar />
                    </div>
                    <div className={styles.headerRight}>
                        {isResponsive ? (
                            <ResponsiveMenu userId={userId} />
                        ) : (
                            <DefaultMenu userId={userId} />
                        )}
                    </div>
                </div>
                <div className={styles.subHeader}>
                    <SearchBar />
                </div>
            </div>
        </header>
    );
}
