import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Multistep from "../../../../components/Multistep/Multistep";
import Select from "../../../../components/Select/Select";
import { getUser, getUserId } from "../../../../redux/selectors";
import AddressCard from "./address-card/AddressCard";
import styles from "./Address.module.css";
import { insertAddressService } from "../../../../services/user.service";

export default function Address() {
    // [STATES]
    const userId = useSelector(getUserId);
    const user = useSelector(getUser);
    const mainAddress = user.addresses?.find((addr) => addr.isMain === true);

    const dispatch = useDispatch();

    const [addressData, setAddressData] = useState({});
    const multistepRef = useRef();

    // [HANDLER FUNCTIONS]
    async function handleFinishMultistep(e) {
        try {
            e.preventDefault();
            /* Call set address request */
            const result = await insertAddressService(
                userId,
                dispatch,
                addressData,
            );
            if (result) console.log("Successfully");
        } catch (error) {
            console.log(error.message);
        }
    }
    function handleSelectOnStep(key) {
        return function (value) {
            setAddressData((prev) => ({
                ...prev,
                [key]: value,
            }));
            multistepRef.current.next();
        };
    }

    // [RENDER]
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.header}>Shipping address</h3>
            <div className={styles.content}>
                <section className={styles.addressSection}>
                    <DeliveryAddress address={mainAddress} />
                </section>
                <section className={styles.addressSection}>
                    <span className={styles.sectionHeader}>
                        Add new address
                    </span>
                    <Multistep
                        autoNext
                        headers={[
                            "country",
                            "city",
                            "district",
                            "town",
                            "street",
                        ]}
                        value={addressData}
                        onFinish={handleFinishMultistep}
                        onTurnBack={setAddressData}
                        ref={multistepRef}
                    >
                        <Select
                            renderData={["Vietnam", "Japan"]}
                            defaultValue={addressData.country}
                            onSelect={handleSelectOnStep("country")}
                            data-index="1"
                        />
                        <Select
                            renderData={["Ho Chi Minh", "Tokyo"]}
                            defaultValue={addressData.city}
                            onSelect={handleSelectOnStep("city")}
                            data-index="2"
                        />
                        <Select
                            renderData={["Thu Duc", "Haido"]}
                            defaultValue={addressData.district}
                            onSelect={handleSelectOnStep("district")}
                            data-index="3"
                        />
                        <Select
                            renderData={["Linh Trung", "Beika"]}
                            defaultValue={addressData.town}
                            onSelect={handleSelectOnStep("town")}
                        />
                        <input
                            autoComplete="off"
                            type="text"
                            required
                            name="street"
                            placeholder="Street"
                            className={styles.streetInput}
                            autoFocus
                            onChange={(e) => {
                                setAddressData((prev) => ({
                                    ...prev,
                                    street: e.target.value,
                                }));
                            }}
                        />
                    </Multistep>
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

// [CUSTOM RENDERED ELEMENTS]
function DeliveryAddress({ address }) {
    return (
        <div className={styles.deliverAddressGroup}>
            <p className={styles.deliverLabel}>Deliver to:</p>
            {address ? (
                <span className={styles.deliverAddress}>
                    {address.country}, {address.city}, {address.district},{" "}
                    {address.town}, {address.street}
                </span>
            ) : (
                <span className={styles.emptyAddress}>
                    Please select a main address for delivery
                </span>
            )}
        </div>
    );
}
