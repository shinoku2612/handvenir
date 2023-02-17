import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    deleteUserAddress,
    setMainAddress,
} from '../../../../../redux/slice/user.slice';
import styles from './AddressCard.module.css';
import cx from '../../../../../utils/class-name';
import { Delete, MoreHoriz, MyLocation } from '@mui/icons-material';

export default function AddressCard({ address, isMain }) {
    // [STATES]
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);

    // [HANDLER FUNCTIONS]
    function handleSetMainAddress(addressId) {
        return function () {
            dispatch(setMainAddress(addressId));
        };
    }
    function handleDeleteAddress(addressId) {
        return function () {
            dispatch(deleteUserAddress(addressId));
        };
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
                <ul className={styles.dropdownMenu} aria-hidden>
                    <li
                        className={styles.dropDownItem}
                        onClick={handleSetMainAddress(address._id)}
                    >
                        <span>Set as default</span>
                        <MyLocation fontSize="small" />
                    </li>
                    <li
                        className={styles.dropDownItem}
                        onClick={handleDeleteAddress(address._id)}
                    >
                        <span>Delete</span>
                        <Delete fontSize="small" />
                    </li>
                </ul>
            </div>
        </div>
    );
}
