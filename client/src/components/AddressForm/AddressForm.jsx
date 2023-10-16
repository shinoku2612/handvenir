import React, { useRef, useState } from "react";
import {
    getCommune,
    getDistrict,
    getProvince,
} from "../../services/location.service";
import Multistep from "../Multistep/Multistep";
import Select from "../Select/Select";

export default function AddressForm({ onFinish }) {
    // [STATES]
    const [addressData, setAddressData] = useState({});
    const [addressAPI, setAddressAPI] = useState({ country: ["Vietnam"] });
    const multistepRef = useRef();

    // [HANDLER FUNCTIONS]
    function handleFinishMultistep(e) {
        e.preventDefault();
        onFinish(addressData);
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
    return (
        <Multistep
            autoNext
            headers={["country", "city", "district", "town", "street"]}
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
                renderData={addressAPI.city?.map((item) => item.name)}
                defaultValue={addressData.city}
                onSelect={handleSelectOnStep("city")}
            />
            <Select
                renderData={addressAPI.district?.map((item) => item.name)}
                defaultValue={addressData.district}
                onSelect={handleSelectOnStep("district")}
            />
            <Select
                renderData={addressAPI.town?.map((item) => item.name)}
                defaultValue={addressData.town}
                onSelect={handleSelectOnStep("town")}
            />
            <input
                autoComplete="off"
                type="text"
                required
                name="street"
                placeholder="Street"
                style={{
                    padding: "0.5em",
                    fontSize: "0.875rem",
                    border: "1px solid #acacac",
                    borderRadius: "0.25rem",
                }}
                autoFocus
                onChange={(e) => {
                    setAddressData((prev) => ({
                        ...prev,
                        street: e.target.value,
                    }));
                }}
            />
        </Multistep>
    );
}
