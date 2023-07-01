import React from "react";
import MENU from "../../../config/menu.config";
import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import classNames from "../../../utils/class-name";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/selectors";

export default function Sidebar() {
    // [STATES]
    const user = useSelector(getUser);
    // [RENDER]
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarTop}>
                <div className={styles.avatarContainer}>
                    <img
                        className={styles.avatar}
                        src="https://genk.mediacdn.vn/k:thumb_w/640/2015/1-2-1444483204242/nhung-dieu-thu-vi-ve-pikachu-bieu-tuong-cua-pokemon.png"
                        alt="User avatar"
                    />
                </div>
                <div className={styles.nameContainer}>
                    <p className={styles.name}>{user.name}</p>
                </div>
            </div>
            <div className={styles.sidebarBottom}>
                <div className={styles.menuContainer}>
                    {MENU.sidebar.map((menu) => (
                        <NavLink
                            key={menu.id}
                            to={menu.path}
                            end
                            className={({ isActive }) =>
                                classNames(styles.menuItem, {
                                    [styles.menuActive]: isActive,
                                })
                            }
                        >
                            <img
                                src={menu.image}
                                alt=""
                                className={styles.menuImage}
                            />
                            <p className={styles.menuTitle}>{menu.title}</p>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
}
