import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import styles from "./Profile.module.css";

export default function Profile() {
    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Profile | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [RENDER]
    return (
        <div className={styles.profile}>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <div className={styles.mainSection}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
