import React, { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { PATH } from "../../config/constant.config";
import { useQueries, useQuery } from "react-query";
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

export default function Checkout() {
    // [STATES]
    const userId = useSelector(getUserId);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState("cod");

    // [QUERIES]
    const { isLoading, data: cart } = useQuery("checkout", () =>
        getCartService(userId, dispatch),
    );
    const productQueries = useQueries(
        cart?.product_list?.map((product) => ({
            queryKey: product.product,
            queryFn: () => getProductByIdService(product.product),
            enabled: cart !== undefined,
        })) ?? [],
    );
    const productList = useMemo(() => {
        return productQueries.reduce((list, { data }) => list.concat(data), []);
    }, [productQueries]);
    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Checkout | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [RENDER]
    if (isLoading) return <Loader variant="overlay" />;

    if (!user) return <Navigate to={`/${PATH.auth}`} />;
    if (!cart) return <Navigate to={`/${PATH.cart}`} />;

    return (
        <div className={styles.checkout}>
            <div className="container">
                <div className={styles.checkoutContainer}>
                    <div className={styles.orderInfo}></div>
                    <div>
                        <div className={styles.orderSummary}>
                            <h3 className={styles.orderHeader}>
                                Order summary
                            </h3>
                            <div className={styles.summaryContainer}>
                                <div className={styles.summaryInfo}>
                                    <span className={styles.summaryLabel}>
                                        Subtotal
                                    </span>
                                    <span className={styles.summaryValue}>
                                        ${cart.total.toFixed(2)}
                                    </span>
                                </div>

                                <div className={styles.totalInfo}>
                                    <span className={styles.totalLabel}>
                                        Total
                                    </span>
                                    <span className={styles.totalValue}>
                                        ${cart.total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.orderSummary}>
                            <h3 className={styles.orderHeader}>
                                Payment method
                            </h3>
                            <div className={styles.paymentMethod}>
                                <span className={styles.summaryLabel}>
                                    We accept
                                </span>
                                <div className={styles.paymentList}>
                                    <div
                                        className={styles.paymentItem}
                                        onClick={() => setPaymentMethod("cod")}
                                    >
                                        <Radio
                                            checked={paymentMethod === "cod"}
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
                                            checked={paymentMethod === "paypal"}
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
                            <CheckoutButton
                                method={paymentMethod}
                                productList={productList}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
