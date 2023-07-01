import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MENU from '../../../config/menu.config';
import { logoutService } from '../../../services/authentication.service';
import styles from './DefaultMenu.module.css';

export default function DefaultMenu({ userId }) {
    return <HeaderMenu userId={userId} />;
}
function HeaderMenu({ userId }) {
    const dispatch = useDispatch();
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

    function handleLogout(action) {
        if (action === 'sign-out')
            return async function (e) {
                try {
                    const result = await logoutService(userId, dispatch);
                    console.log(result);
                } catch (error) {
                    console.log(error.message);
                }
            };
    }

    return filteredMenu.map((menu) => (
        <NavLink
            key={menu.id}
            to={menu.path}
            className={styles.menuItem}
            onClick={handleLogout(menu.id)}
        >
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
