import React, { lazy, useCallback, useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import { Upload } from "@mui/icons-material";
import Table from "../../components/Table/Table";
import {
    getCartService,
    getLocalCart,
    removeFromCartService,
    syncLocalCartService,
    updateCartService,
} from "../../services/cart.service";
import Loader from "../../components/Loader/Loader";
import { getCart, getUser, getUserId } from "../../redux/selectors";
import emptyCartSVG from "../../assets/images/empty-cart.svg";
import { NavLink } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";
import { PATH } from "../../config/constant.config";
import CartRow from "./CartRow";
// Error page
const Info = lazy(() => import("../info/Info"));

export default function Cart() {
    // [STATES]
    const userId = useSelector(getUserId);
    const user = useSelector(getUser);
    const cart = useSelector(getCart);
    const dispatch = useDispatch();
    // [QUERIES]
    const { isLoading, data } = useQuery("cart", () =>
        Promise.all([getCartService(userId, dispatch), getLocalCart()]).then(
            ([cart, localCart]) => ({ cart, localCart }),
        ),
    );
    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Cart | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [HANDLER FUNCTIONS]
    const handleSyncCart = async () => {
        await syncLocalCartService(userId, dispatch, data.localCart);
        // window.location.replace(PATH.cart);
    };
    const handleRemoveProduct = async (productId) => {
        try {
            await removeFromCartService(userId, dispatch, productId);
        } catch (error) {
            console.log(error.message);
        }
    };
    const handleUpdateCart = useCallback(
        async (productId, quantity) => {
            try {
                await updateCartService(userId, dispatch, {
                    productId,
                    quantity,
                });
            } catch (error) {
                console.log(error.message);
            }
        },
        [dispatch, userId],
    );

    // [RENDER]
    if (isLoading) return <Loader variant="overlay" />;

    if (!cart)
        return (
            <React.Fragment>
                <Info
                    image={{ src: emptyCartSVG, styles: { width: "32%" } }}
                    title="Empty Cart"
                    message={{
                        header: "Unfotunately, your cart is empty!",
                        info: "Look like you have not added anything to your cart.",
                        suggest: "We suggest you go to shop",
                    }}
                    navigator={{ target: "/products", title: "Shop now" }}
                    isChild
                />

                {!!(user && data.localCart) ? (
                    <PopUp
                        title="Synchronize your cart"
                        message="We noticed you currently have a shopping cart on your device, would you like to upload it to sync with your account?"
                        handler={handleSyncCart}
                    >
                        <Upload
                            sx={{
                                color: "",
                                lineHeight: 0,
                            }}
                        />
                    </PopUp>
                ) : null}
            </React.Fragment>
        );

    return (
        <div className={styles.cart}>
            <div className="container">
                <div className={styles.cartContainer}>
                    <div className={styles.cartProductContainer}>
                        <h3 className={styles.cartHeader}>My cart</h3>
                        <Table
                            headers={[
                                "Product",
                                "Quantity",
                                "Price",
                                "Total",
                                "Action",
                            ]}
                            data={cart.product_list}
                            pagination
                            rowPerPage={3}
                            renderItem={CartRow}
                            keyExtractor={(item) => item.product}
                            onRemoveProduct={handleRemoveProduct}
                            onUpdateProduct={handleUpdateCart}
                        />
                    </div>
                    <div className={styles.orderSummary}>
                        <h3 className={styles.cartHeader}>Order summary</h3>
                        <div className={styles.summaryContainer}>
                            <div className={styles.summaryInfo}>
                                <span className={styles.summaryLabel}>
                                    Subtotal
                                </span>
                                <span className={styles.summaryValue}>
                                    ${cart.total ? cart.total.toFixed(2) : 0}
                                </span>
                            </div>
                            {/* <div className={styles.summaryInfo}>
                                <span className={styles.summaryLabel}>
                                    Estimated shipping
                                </span>
                                <span className={styles.summaryValue}>$0.5</span>
                            </div> */}
                            {user?.mainAddress ? (
                                <div className={styles.summaryInfo}>
                                    <span className={styles.summaryLabel}>
                                        Shipping to
                                    </span>
                                    <NavLink
                                        className="text-small text-secondary clickable-link"
                                        title="Click to change delivery address"
                                        to={`/me/${PATH.profile.address}`}
                                    >
                                        {user.mainAddress}
                                    </NavLink>
                                </div>
                            ) : null}
                            <div className={styles.totalInfo}>
                                <span className={styles.totalLabel}>Total</span>
                                <span className={styles.totalValue}>
                                    ${cart.total ? cart.total.toFixed(2) : 0}
                                </span>
                            </div>
                            <NavLink
                                className="btn btn-dark width-full"
                                to={`/${PATH.checkout}`}
                            >
                                Checkout
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            {!!(user && data.localCart) ? (
                <PopUp
                    title="Synchronize your cart"
                    message="We noticed you currently have a shopping cart on your device, would you like to upload it to sync with your account?"
                    handler={handleSyncCart}
                >
                    <Upload
                        sx={{
                            color: "",
                            lineHeight: 0,
                        }}
                    />
                </PopUp>
            ) : null}
        </div>
    );
}
