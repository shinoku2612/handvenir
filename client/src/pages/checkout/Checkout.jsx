import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PATH } from "../../config/constant.config";
import { useQuery } from "react-query";
import { getCartService } from "../../services/cart.service";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserId } from "../../redux/selectors";
import Loader from "../../components/Loader/Loader";
import styles from "./Checkout.module.css";
import CheckoutButton from "../../components/CheckoutButton";
import codSVG from "../../assets/images/cod.svg";
import paypalSVG from "../../assets/images/paypal.svg";
import { Radio } from "@mui/material";
import { getProductByIdService } from "../../services/product.service";
import cx from "../../utils/class-name";
import AddressForm from "../../components/AddressForm/AddressForm";

export default function Checkout() {
    // [STATES]
    const userId = useSelector(getUserId);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [shippingAddress, setShippingAddress] = useState(user?.mainAddress);
    const [shippingEditable, setShippingEditable] = useState(false);
    const [receiver, setReceiver] = useState({
        name: user.name,
        phone: user.phone,
    });

    // [QUERIES]
    const { isLoading: cartLoading, data: cart } = useQuery(
        "checkout-cart",
        () => getCartService(userId, dispatch),
    );
    const { isLoading: productLoading, data: productList } = useQuery(
        "checkout-product-list",
        () =>
            Promise.all(
                cart.product_list.map((product) =>
                    getProductByIdService(product.product),
                ),
            ),
        { enabled: !!cart },
    );

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Checkout | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [HANDLER FUNCTIONS]
    function handleChangeReceiver(e) {
        setReceiver((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    function handleFinishMultistep(address) {
        const { country, city, district, town, street } = address;
        const shippingTo = [street, town, district, city, country].join(", ");
        setShippingAddress(shippingTo);
        setShippingEditable(false);
    }

    // [RENDER]
    if (cartLoading || productLoading) return <Loader variant="overlay" />;

    if (!user) return <Navigate to={`/${PATH.auth}`} />;
    if (!cart) return <Navigate to={`/${PATH.cart}`} />;

    return (
        <div className={styles.checkout}>
            <div className="container">
                <div className={styles.checkoutContainer}>
                    <div className={styles.breadcrumbs}>
                        <div className={styles.widget}>
                            <h3 className={styles.widgetHeader}>
                                Customer information
                            </h3>
                            <div className={styles.widgetBody}>
                                <form className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label
                                            htmlFor="receiver-name"
                                            className={styles.formLabel}
                                        >
                                            Receiver name*
                                        </label>
                                        <input
                                            className={styles.formInput}
                                            id="receiver-name"
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={receiver.name}
                                            onChange={handleChangeReceiver}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label
                                            htmlFor="receiver-number"
                                            className={styles.formLabel}
                                        >
                                            Phone*
                                        </label>
                                        <input
                                            className={styles.formInput}
                                            id="receiver-number"
                                            type="tel"
                                            placeholder="Phone number"
                                            name="phone"
                                            pattern="[0-9]{10}"
                                            value={receiver.phone}
                                            onChange={handleChangeReceiver}
                                        />
                                    </div>
                                </form>
                                <div className={styles.shippingAddress}>
                                    <div className={styles.shippingTo}>
                                        <h4>Shipping to:</h4>
                                        <span
                                            className={cx(
                                                styles.address,
                                                "text-primary",
                                            )}
                                        >
                                            {shippingAddress}
                                        </span>
                                        <button
                                            className={styles.toggleButton}
                                            onClick={() =>
                                                setShippingEditable(
                                                    (prev) => !prev,
                                                )
                                            }
                                        >
                                            {shippingEditable
                                                ? "Cancel"
                                                : "Edit address"}
                                        </button>
                                    </div>
                                    {shippingEditable ? (
                                        <AddressForm
                                            onFinish={handleFinishMultistep}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className={styles.widget}>
                            <h3 className={styles.widgetHeader}>
                                Order details
                            </h3>
                            <div className={styles.widgetBody}>
                                <div className={styles.productList}>
                                    {productList.map((product) => (
                                        <div
                                            key={product._id}
                                            className={styles.product}
                                            title={product.title}
                                        >
                                            <div className={styles.productCard}>
                                                <img
                                                    className={
                                                        styles.productImage
                                                    }
                                                    src={product.image}
                                                    alt={product.title}
                                                />
                                                <span
                                                    className={
                                                        styles.productQuantity
                                                    }
                                                >
                                                    x
                                                    {
                                                        cart.product_list.find(
                                                            (p) =>
                                                                p.product ===
                                                                product._id,
                                                        ).quantity
                                                    }
                                                </span>
                                            </div>
                                            <span
                                                className={styles.productPrice}
                                            >
                                                ${product.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.breadcrumbs}>
                        <div className={styles.widget}>
                            <h3 className={styles.widgetHeader}>
                                Order summary
                            </h3>
                            <div className={styles.widgetBody}>
                                <div className={styles.orderInfo}>
                                    <span className={styles.orderLabel}>
                                        Sub total
                                    </span>
                                    <span className={styles.orderValue}>
                                        ${cart.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.widgetBody}>
                                <div className={styles.orderInfo}>
                                    <span className={styles.orderLabel}>
                                        Shipping cost
                                    </span>
                                    <span
                                        className={cx(
                                            "text-success",
                                            styles.orderValue,
                                        )}
                                    >
                                        Free
                                    </span>
                                </div>
                            </div>
                            <div className={styles.widgetBody}>
                                <div className={styles.orderInfo}>
                                    <span className={styles.totalLabel}>
                                        Total
                                    </span>
                                    <span className={styles.totalValue}>
                                        ${cart.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.widget}>
                            <h3 className={styles.widgetHeader}>
                                Payment method
                            </h3>
                            <div className={styles.widgetBody}>
                                <div className={styles.orderInfo}>
                                    <span className={styles.orderLabel}>
                                        We accept
                                    </span>
                                    <div className={styles.paymentList}>
                                        <div
                                            className={styles.paymentItem}
                                            onClick={() =>
                                                setPaymentMethod("cod")
                                            }
                                        >
                                            <Radio
                                                checked={
                                                    paymentMethod === "cod"
                                                }
                                                size="small"
                                            />
                                            <img
                                                src={codSVG}
                                                alt="Cash on delivery"
                                                className={styles.paymentImage}
                                            />
                                        </div>
                                        <div
                                            className={styles.paymentItem}
                                            onClick={() =>
                                                setPaymentMethod("paypal")
                                            }
                                        >
                                            <Radio
                                                checked={
                                                    paymentMethod === "paypal"
                                                }
                                                size="small"
                                            />
                                            <img
                                                src={paypalSVG}
                                                alt="PayPal"
                                                className={styles.paymentImage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CheckoutButton
                                method={paymentMethod}
                                productList={productList}
                                address={shippingAddress}
                                receiver={receiver}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
