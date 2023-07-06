import React from "react";
import styles from "./Empty.module.css";
import emptyCartSVG from "../../../assets/images/empty-cart.svg";
import { NavLink } from "react-router-dom";

export default function EmptyCart() {
    return (
        <div className={styles.emptyCart}>
            <div className={styles.emptyCartImageContainer}>
                <img
                    src={emptyCartSVG}
                    alt="Your cart is empty"
                    className={styles.emptyCartImage}
                />
            </div>
            <div className={styles.emptyCartContentContainer}>
                <h3 className={styles.emptyCartTitle}>
                    Unfotunately, your cart is empty
                </h3>
                <p className={styles.emptyCartInfo}>
                    Look like you have not added anything to your cart.
                </p>
                <p className={styles.emptyCartInfo}>
                    We suggest you go to shop
                </p>
                <NavLink
                    to="/products"
                    className="btn btn-primary mt-1"
                >
                    Shop now
                </NavLink>
            </div>
        </div>
    );
}
