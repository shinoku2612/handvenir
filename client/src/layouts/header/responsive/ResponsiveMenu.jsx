import { Close, Menu } from '@mui/icons-material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import MENU from '../../../config/menu.config';
import cx from '../../../utils/class-name';
import styles from './ResponsiveMenu.module.css';

export default function ResponsiveMenu({ userId }) {
    const [showMenu, setShowMenu] = useState(false);

    function HeaderMenu() {
        let filteredMenu;
        if (userId) {
            filteredMenu = MENU.header.filter(
                (menu) => menu.accessibility !== 'public',
            );
        } else {
            filteredMenu = MENU.header.filter(
                (menu) => menu.accessibility !== 'private',
            );
        }

        return filteredMenu.map((menu) => (
            <NavLink key={menu.id} to={menu.path} className={styles.menuItem}>
                {menu.id === 'user' ? (
                    <img
                        src="https://genk.mediacdn.vn/k:thumb_w/640/2015/1-2-1444483204242/nhung-dieu-thu-vi-ve-pikachu-bieu-tuong-cua-pokemon.png"
                        alt="User Avatar"
                        className={styles.userAvatar}
                    />
                ) : (
                    menu.icon
                )}
                {menu.id === 'user' ? (
                    <span className={styles.userName}>User name</span>
                ) : (
                    <span className={styles.menuTitle}>{menu.title}</span>
                )}
            </NavLink>
        ));
    }

    return (
        <React.Fragment>
            {showMenu ? (
                <div
                    className={styles.toogleMenu}
                    onClick={() => setShowMenu(false)}
                >
                    <Close sx={{ fontSize: '2rem' }} />
                </div>
            ) : (
                <div
                    className={styles.toogleMenu}
                    onClick={() => setShowMenu(true)}
                >
                    <Menu sx={{ fontSize: '2rem' }} />
                </div>
            )}
            <div className={cx(styles.headerMenu, { [styles.show]: showMenu })}>
                <div className={styles.menuContainer}>
                    <HeaderMenu />
                </div>
            </div>
        </React.Fragment>
    );
}
