import React from "react";
import { checkType } from "../../utils/helper";
import styles from "./QuantityGroup.module.css";

export default function QuantityGroup({ quantity = 1, onChange }) {
    // [STATES]

    // [HANDLER FUNCTIONS]
    function handleInputQuantity(e) {
        const newValue = e.target.value.replace(/[^0-9]/g, "");
        if (newValue <= 0) {
            return onChange(1);
        }
        onChange(Number(newValue));
    }
    function handleChangeQuantity(type) {
        return function () {
            if (checkType(onChange) !== "function") return;
            if (type === "increase")
                return onChange((prevQuantity) => prevQuantity + 1);
            if (type === "decrease")
                return onChange((prevQuantity) =>
                    prevQuantity > 1 ? prevQuantity - 1 : 1,
                );
        };
    }
    return (
        <div className={styles.quantityGroup}>
            <button
                className={styles.actionBtn}
                onClick={handleChangeQuantity("decrease")}
            >
                -
            </button>
            <input
                className={styles.quantity}
                value={quantity}
                onChange={handleInputQuantity}
            />
            <button
                className={styles.actionBtn}
                onClick={handleChangeQuantity("increase")}
            >
                +
            </button>
        </div>
    );
}
