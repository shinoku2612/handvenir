import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import MENU from "../../../config/menu.config";
import { logoutService } from "../../../services/authentication.service";
import styles from "./DefaultMenu.module.css";
import { getUser } from "../../../redux/selectors";

export default function DefaultMenu({ userId }) {
    return <HeaderMenu userId={userId} />;
}
function HeaderMenu({ userId }) {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    let filteredMenu;
    if (user) {
        filteredMenu = MENU.header.filter(
            (menu) => menu.accessibility !== "public",
        );
    } else {
        filteredMenu = MENU.header.filter(
            (menu) => menu.accessibility !== "private",
        );
    }

    function handleLogout(action) {
        if (action === "sign-out")
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
            {menu.id === "user" ? (
                <img
                    src={user.avatar}
                    alt="User Avatar"
                    className={styles.userAvatar}
                />
            ) : (
                menu.icon
            )}
        </NavLink>
    ));
}
