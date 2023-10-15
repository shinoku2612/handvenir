import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import DefaultMenu from "./default/DefaultMenu";
import ResponsiveMenu from "./responsive/ResponsiveMenu";
import { useSelector } from "react-redux";
import { getUserId } from "../../redux/selectors";
import { ArrowDropDown } from "@mui/icons-material";
import cx from "../../utils/class-name";
import MENU from "../../config/menu.config";

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

        window.addEventListener("resize", handleResize);

        return function () {
            window.removeEventListener("resize", handleResize);
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
                        <NavLink
                            to="/"
                            className={styles.logo}
                        >
                            <img
                                src={`${process.env.PUBLIC_URL}/logo.png`}
                                alt=""
                                className={styles.logoImg}
                            />
                            <span className={styles.logoName}>{process.env.REACT_APP_SITE_TITLE}</span>
                        </NavLink>
                    </div>
                    <div className={styles.headerCenter}>
                        <NavLink
                            to="/products"
                            className={styles.centerMenu}
                        >
                            <span>Products</span>
                        </NavLink>
                        <NavLink
                            to="/volunteer-campaigns"
                            className={styles.centerMenu}
                        >
                            <span>Volunteer campaigns</span>
                        </NavLink>
                        <div className={cx(styles.centerMenu, styles.dropdown)}>
                            <span>More</span>
                            <ArrowDropDown />
                            <nav className={styles.dropdownContainer}>
                                {MENU.extendedHeader.map((menu) =>
                                    menu.source === "external" ? (
                                        <a
                                            key={menu.id}
                                            href={menu.path}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={styles.dropdownItem}
                                        >
                                            {menu.icon}
                                            <span
                                                className={styles.dropdownTitle}
                                            >
                                                {menu.title}
                                            </span>
                                        </a>
                                    ) : (
                                        <NavLink
                                            key={menu.id}
                                            to={menu.path}
                                            className={styles.dropdownItem}
                                        >
                                            {menu.icon}
                                            <span
                                                className={styles.dropdownTitle}
                                            >
                                                {menu.title}
                                            </span>
                                        </NavLink>
                                    ),
                                )}
                            </nav>
                        </div>
                    </div>
                    <div className={styles.headerRight}>
                        {isResponsive ? (
                            <ResponsiveMenu userId={userId} />
                        ) : (
                            <DefaultMenu userId={userId} />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
