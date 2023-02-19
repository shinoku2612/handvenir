import React from 'react';
import { NavLink } from 'react-router-dom';
import MENU from '../../../config/menu.config';
import styles from './DefaultMenu.module.css';

export default function DefaultMenu({ userId }) {
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
            </NavLink>
        ));
    }
    return <HeaderMenu />;
}
