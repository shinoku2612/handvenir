import React, { lazy, useCallback, useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import { Skeleton } from "@mui/material";
import { DeleteForever, Upload } from "@mui/icons-material";
import QuantityGroup from "../../components/QuantityGroup/QuantityGroup";
import Table from "../../components/Table/Table";
import {
    getCartService,
    getCartTotalService,
    getLocalCart,
    removeFromCartService,
    syncLocalCartService,
    updateCartService,
} from "../../services/cart.service";
import { getProductByIdService } from "../../services/product.service";
import Loader from "../../components/Loader/Loader";
import {
    getCart,
    getCartTotal,
    getUser,
    getUserId,
} from "../../redux/selectors";
import cx from "../../utils/class-name";
import emptyCartSVG from "../../assets/images/empty-cart.svg";
import { NavLink } from "react-router-dom";
import PopUp from "../../components/PopUp/PopUp";
import { makeOrderService } from "../../services/order.service";
import { PATH } from "../../config/constant.config";
// Error page
const Error = lazy(() => import("../error/Error"));

export default function Cart() {
    // [STATES]
    const userId = useSelector(getUserId);
    const user = useSelector(getUser);
    const [mainAddress, setMainAddress] = useState();
    const cart = useSelector(getCart);
    const cartTotal = useSelector(getCartTotal);
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
    useEffect(() => {
        if (cart) {
            getCartTotalService(dispatch, cart.product_list);
        }
    }, [dispatch, cart]);
    useEffect(() => {
        if (user) {
            const mainAddress = user.addresses?.find(
                (addr) => addr.isMain === true,
            );
            setMainAddress(mainAddress);
        }
    }, [user]);

    // [HANDLER FUNCTIONS]
    const handleSyncCart = async () => {
        await syncLocalCartService(userId, dispatch, data.localCart);
        // window.location.replace(PATH.cart);
    };
    const handleCheckout = async () => {
        const deliveryAddress = `${mainAddress.street}, ${mainAddress.town}, ${mainAddress.district}, ${mainAddress.city}, ${mainAddress.country}`;
        await makeOrderService(userId, {
            product_list: cart.product_list,
            address: deliveryAddress,
        });
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
                <Error
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
                            renderItem={ProductRow}
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
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>
                            {/* <div className={styles.summaryInfo}>
                                <span className={styles.summaryLabel}>
                                    Estimated shipping
                                </span>
                                <span className={styles.summaryValue}>$9</span>
                            </div> */}
                            {mainAddress ? (
                                <div className={styles.summaryInfo}>
                                    <span className={styles.summaryLabel}>
                                        Shipping to
                                    </span>
                                    <NavLink
                                        className="text-small text-secondary clickable-link"
                                        title="Click to change delivery address"
                                        to={`/me/${PATH.profile.address}`}
                                    >
                                        {mainAddress.street}, {mainAddress.town}
                                        , {mainAddress.district},{" "}
                                        {mainAddress.city},{" "}
                                        {mainAddress.country}
                                    </NavLink>
                                </div>
                            ) : null}
                            <div className={styles.totalInfo}>
                                <span className={styles.totalLabel}>Total</span>
                                <span className={styles.totalValue}>
                                    ${cartTotal.toFixed(2)}
                                </span>
                            </div>
                            <div
                                className="btn btn-dark width-full"
                                onClick={handleCheckout}
                            >
                                Place order
                            </div>
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

// [CUSTOM RENDERED ELEMENTS]
const ProductRow = React.memo(
    ({ item, debouncedTimer = 500, onRemoveProduct, onUpdateProduct }) => {
        // [QUERIES]
        const { isLoading, data: product } = useQuery(
            ["single-product", item.product],
            () => getProductByIdService(item.product),
        );

        // [STATES]
        const [quantity, setQuantity] = useState(item.quantity);
        const isFirstRender = useRef(true);
        const previousQuantity = useRef(quantity);

        // [SIDE EFFECTS]
        useEffect(() => {
            setQuantity(item.quantity);
        }, [item.quantity]);
        useEffect(() => {
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }
            if (previousQuantity.current !== quantity) {
                const timerId = setTimeout(() => {
                    onUpdateProduct(item.product, quantity);
                    previousQuantity.current = quantity;
                }, debouncedTimer);

                return () => {
                    clearTimeout(timerId);
                };
            }
        }, [quantity, debouncedTimer, onUpdateProduct, item.product]);

        // [RENDER]
        if (isLoading)
            return (
                <tr>
                    <td>
                        <div className={styles.productInfo}>
                            <Skeleton
                                width={100}
                                height={80}
                            />
                            <Skeleton
                                variant="text"
                                width={200}
                                sx={{
                                    fontSize: "1rem",
                                    marginLeft: "1rem",
                                }}
                            />
                        </div>
                    </td>
                    <td>
                        <Skeleton height={50} />
                    </td>
                    <td>
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                        />
                    </td>
                    <td>
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                        />
                    </td>
                    <td></td>
                </tr>
            );
        return (
            <tr>
                <td>
                    <NavLink
                        to={`/product/${product.slug}`}
                        className={styles.productInfo}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.image}
                        />
                        <span className={styles.info}>{product.title}</span>
                    </NavLink>
                </td>
                <td>
                    <QuantityGroup
                        quantity={quantity}
                        onChange={setQuantity}
                    />
                </td>
                <td>
                    <span className={styles.info}>${product.price}</span>
                </td>
                <td>
                    <strong className={styles.info}>
                        ${(quantity * product.price).toFixed(2)}
                    </strong>
                </td>
                <td>
                    <DeleteForever
                        className={cx(styles.action, styles.delete)}
                        sx={{
                            transition: "transform 200ms ease-in-out;",
                        }}
                        onClick={() => onRemoveProduct(item.product)}
                    />
                </td>
            </tr>
        );
    },
);
