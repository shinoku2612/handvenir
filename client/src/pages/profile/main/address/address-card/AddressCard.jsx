import React, { useState } from "react";
import styles from "./AddressCard.module.css";
import cx from "../../../../../utils/class-name";
import { Delete, MoreHoriz, MyLocation } from "@mui/icons-material";
import {
    deleteAddressService,
    setDefaultAddressService,
} from "../../../../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../../../redux/selectors";

export default function AddressCard({ addressId, address, isMain }) {
    // [STATES]
    const userId = useSelector(getUserId);
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();

    // [HANDLER FUNCTIONS]
    async function handleSetDefaultAddress() {
        try {
            await setDefaultAddressService(userId, dispatch, addressId);
        } catch (error) {
            console.log(error.message);
        }
    }
    async function handleDeleteAddress() {
        try {
            await deleteAddressService(userId, dispatch, addressId);
        } catch (error) {
            console.log(error.message);
        }
    }

    // [RENDER]
    return (
        <div className={cx(styles.addressCard, { [styles.main]: isMain })}>
            <div className={styles.location}>
                <p className={styles.locationType}>Country</p>
                <span className={styles.locationName}>{address.country}</span>
            </div>
            <div className={styles.location}>
                <p className={styles.locationType}>City</p>
                <span className={styles.locationName}>{address.city}</span>
            </div>
            <div className={styles.location}>
                <p className={styles.locationType}>District</p>
                <span className={styles.locationName}>{address.district}</span>
            </div>
            <div className={styles.location}>
                <p className={styles.locationType}>Town</p>
                <span className={styles.locationName}>{address.town}</span>
            </div>
            <div className={styles.location}>
                <p className={styles.locationType}>Street</p>
                <span className={styles.locationName}>{address.street}</span>
            </div>
            <div
                className={cx(styles.dropdownContainer, {
                    [styles.active]: showDropdown,
                })}
                onClick={() => setShowDropdown((prev) => !prev)}
            >
                <MoreHoriz />
                <ul
                    className={styles.dropdownMenu}
                    aria-hidden
                >
                    <li
                        className={styles.dropDownItem}
                        onClick={handleSetDefaultAddress}
                    >
                        <span>Set as default</span>
                        <MyLocation fontSize="small" />
                    </li>
                    <li
                        className={styles.dropDownItem}
                        onClick={handleDeleteAddress}
                    >
                        <span>Delete</span>
                        <Delete fontSize="small" />
                    </li>
                </ul>
            </div>
        </div>
    );
}
