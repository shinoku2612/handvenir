import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../redux/selectors";
import { useQuery } from "react-query";
import { getUserService } from "../../services/user.service";

export default function Profile() {
    // [STATES]
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    useQuery(["user", userId], () => getUserService(userId, dispatch));

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
