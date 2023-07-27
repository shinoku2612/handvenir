import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Multistep from "../../../../components/Multistep/Multistep";
import Select from "../../../../components/Select/Select";
import { getUser, getUserId } from "../../../../redux/selectors";
import AddressCard from "./address-card/AddressCard";
import styles from "./Address.module.css";
import { insertAddressService } from "../../../../services/user.service";
import {
    getCommune,
    getDistrict,
    getProvince,
} from "../../../../services/location.service";

export default function Address() {
    // [STATES]
    const userId = useSelector(getUserId);
    const user = useSelector(getUser);
    const mainAddress = user.addresses?.find((addr) => addr.isMain === true);

    const dispatch = useDispatch();

    const [addressData, setAddressData] = useState({});
    const [addressAPI, setAddressAPI] = useState({ country: ["Vietnam"] });
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
        return async function (value) {
            switch (key) {
                case "country": {
                    const res = await getProvince(value);
                    setAddressAPI((prev) => ({
                        ...prev,
                        city: res,
                    }));
                    break;
                }
                case "city": {
                    const currentCity = addressAPI.city.find(
                        (city) => city.name === value,
                    );
                    const res = await getDistrict(
                        addressData.country,
                        currentCity.code,
                    );
                    setAddressAPI((prev) => ({
                        ...prev,
                        district: res.self,
                    }));
                    break;
                }
                case "district": {
                    const currentDistrict = addressAPI.district.find(
                        (district) => district.name === value,
                    );
                    const res = await getCommune(
                        addressData.country,
                        currentDistrict.code,
                    );
                    setAddressAPI((prev) => ({
                        ...prev,
                        town: res.self,
                    }));
                    break;
                }
                default:
                    break;
            }
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
                            renderData={["Vietnam"]}
                            defaultValue={addressData.country}
                            onSelect={handleSelectOnStep("country")}
                        />
                        <Select
                            renderData={addressAPI.city?.map(
                                (item) => item.name,
                            )}
                            defaultValue={addressData.city}
                            onSelect={handleSelectOnStep("city")}
                        />
                        <Select
                            renderData={addressAPI.district?.map(
                                (item) => item.name,
                            )}
                            defaultValue={addressData.district}
                            onSelect={handleSelectOnStep("district")}
                        />
                        <Select
                            renderData={addressAPI.town?.map(
                                (item) => item.name,
                            )}
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
                    {address.street}, {address.town}, {address.district},{" "}
                    {address.city}, {address.country}
                </span>
            ) : (
                <span className={styles.emptyAddress}>
                    Please select a main address for delivery
                </span>
            )}
        </div>
    );
}
