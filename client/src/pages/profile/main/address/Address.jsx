import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserId } from "../../../../redux/selectors";
import AddressCard from "./address-card/AddressCard";
import styles from "./Address.module.css";
import AddressForm from "../../../../components/AddressForm/AddressForm";
import { insertAddressService } from "../../../../services/user.service";

export default function Address() {
    // [STATES]
    const user = useSelector(getUser);
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    const mainAddress = user.addresses?.find((addr) => addr.isMain === true);

    // [HANDLER FUNCTIONS]
    async function handleFinishMultistep(address) {
        try {
            /* Call set address request */
            const result = await insertAddressService(
                userId,
                dispatch,
                address,
            );
            if (result) console.log("Successfully");
        } catch (error) {
            console.log(error.message);
        }
    }

    // [RENDER]
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.header}>Shipping address</h3>
            <div className={styles.content}>
                <section className={styles.addressSection}>
                    <div className={styles.deliverAddressGroup}>
                        <p className={styles.deliverLabel}>Deliver to:</p>
                        {mainAddress ? (
                            <span className={styles.deliverAddress}>
                                {user.mainAddress}
                            </span>
                        ) : (
                            <span className={styles.emptyAddress}>
                                Please select a main address for delivery
                            </span>
                        )}
                    </div>
                </section>
                <section className={styles.addressSection}>
                    <span className={styles.sectionHeader}>
                        Add new address
                    </span>
                    <AddressForm onFinish={handleFinishMultistep} />
                </section>

                <section className={styles.addressSection}>
                    <span className={styles.sectionHeader}>My addresses</span>
                    {user.addresses?.length === 0 ? (
                        <p>You haven't added any address, please add one!</p>
                    ) : (
                        user.addresses?.map((address, index) => (
                            <AddressCard
                                key={address._id}
                                addressId={address._id}
                                address={address}
                                isMain={
                                    mainAddress &&
                                    mainAddress._id === address._id
                                }
                            />
                        ))
                    )}
                </section>
            </div>
        </div>
    );
}
