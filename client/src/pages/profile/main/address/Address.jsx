import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Multistep from '../../../../components/Multistep/Multistep';
import Select from '../../../../components/Select/Select';
import { getUserAddress } from '../../../../redux/selectors';
import { addUserAddress } from '../../../../redux/slice/user.slice';
import AddressCard from './address-card/AddressCard';
import styles from './Address.module.css';

export default function Address() {
    // [STATES]
    const userAddress = useSelector(getUserAddress);
    const mainAddress = userAddress.find((addr) => addr.isMain === true);

    const dispatch = useDispatch();

    const [addressData, setAddressData] = useState({});
    const multistepRef = useRef();

    // [HANDLER FUNCTIONS]
    function handleFinishMultistep(e) {
        e.preventDefault();
        dispatch(addUserAddress(addressData));
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
                            'country',
                            'city',
                            'district',
                            'town',
                            'street',
                        ]}
                        value={addressData}
                        onFinish={handleFinishMultistep}
                        onTurnBack={setAddressData}
                        ref={multistepRef}
                    >
                        <Select
                            renderData={['Vietnam', 'Japan']}
                            defaultValue={addressData.country}
                            onSelect={handleSelectOnStep('country')}
                            data-index="1"
                        />
                        <Select
                            renderData={['Ho Chi Minh', 'Tokyo']}
                            defaultValue={addressData.city}
                            onSelect={handleSelectOnStep('city')}
                            data-index="2"
                        />
                        <Select
                            renderData={['Thu Duc', 'Haido']}
                            defaultValue={addressData.district}
                            onSelect={handleSelectOnStep('district')}
                            data-index="3"
                        />
                        <Select
                            renderData={['Linh Trung', 'Beika']}
                            defaultValue={addressData.town}
                            onSelect={handleSelectOnStep('town')}
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
                    <span className={styles.sectionHeader}>Others</span>
                    {userAddress.map((address, index) => (
                        <AddressCard
                            key={index}
                            address={address}
                            isMain={
                                mainAddress && mainAddress._id === address._id
                            }
                        />
                    ))}
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
                    {address.country}, {address.city}, {address.district},{' '}
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
