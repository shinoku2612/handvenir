import React, { lazy, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import { Checkbox, Skeleton } from "@mui/material";
import { DeleteForever, Done } from "@mui/icons-material";
import QuantityGroup from "../../components/QuantityGroup/QuantityGroup";
import Table from "../../components/Table/Table";
import {
    getCartService,
    getCartTotalService,
    removeFromCartService,
    updateCartService,
} from "../../services/cart.service";
import { getProductByIdService } from "../../services/product.service";
import Loader from "../../components/Loader/Loader";
import { getCart, getCartTotal, getUserId } from "../../redux/selectors";
import cx from "../../utils/class-name";
import emptyCartSVG from "../../assets/images/empty-cart.svg";
// Error page
const Error = lazy(() => import("../error/Error"));

export default function Cart() {
    // [STATES]
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    // [QUERIES]
    const { isLoading } = useQuery("cart", () =>
        getCartService(userId, dispatch),
    );
    const cart = useSelector(getCart);
    useQuery(["cart-total", cart], () => {
        if (cart) {
            getCartTotalService(dispatch, cart.product_list);
        }
    });
    const cartTotal = useSelector(getCartTotal);

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Cart | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [RENDER]
    if (isLoading) return <Loader variant="overlay" />;
    if (!cart)
        return (
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
        );

    return (
        <div className={styles.cart}>
            <div className="container">
                <div className={styles.cartContainer}>
                    <div className={styles.cartProductContainer}>
                        <h3 className={styles.cartHeader}>My cart</h3>
                        <Table
                            headers={[
                                <Checkbox
                                    defaultChecked
                                    title="Select all"
                                />,
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
                            keyExtractor={(item) => item.productId}
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
                                    ${cartTotal}
                                </span>
                            </div>
                            <div className={styles.summaryInfo}>
                                <span className={styles.summaryLabel}>
                                    Estimated shipping
                                </span>
                                <span className={styles.summaryValue}>$9</span>
                            </div>
                            <div className={styles.summaryInfo}>
                                <span className={styles.summaryLabel}>
                                    Shipping to
                                </span>
                                <span
                                    className="text-small text-secondary clickable-link"
                                    title="Click to change delivery address"
                                >
                                    01 Vo Van Ngan, Linh Trung, Thu Đuc, Ho Chi
                                    Minh
                                </span>
                            </div>
                            <div className={styles.totalInfo}>
                                <span className={styles.totalLabel}>Total</span>
                                <span className={styles.totalValue}>
                                    ${cartTotal}
                                </span>
                            </div>
                            <div className="btn btn-dark width-full">
                                Place order
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// [CUSTOM RENDERED ELEMENTS]
function ProductRow({ item }) {
    // [QUERIES]
    const { isLoading, data: product } = useQuery(
        ["single-product", item.productId],
        () => getProductByIdService(item.productId),
    );

    // [STATES]
    const [quantity, setQuantity] = useState(item.quantity);
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();

    // [HANDLER FUNCTIONS]
    async function handleRemoveProduct() {
        try {
            await removeFromCartService(userId, dispatch, item.productId);
        } catch (error) {
            console.log(error.message);
        }
    }
    async function handleUpdateProduct() {
        try {
            await updateCartService(userId, dispatch, {
                productId: item.productId,
                quantity,
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    // [RENDER]
    return (
        <tr>
            <td>{!isLoading && <Checkbox defaultChecked />}</td>
            <td>
                <div className={styles.productInfo}>
                    {isLoading ? (
                        <Skeleton
                            width={100}
                            height={80}
                        />
                    ) : (
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.image}
                        />
                    )}
                    <span className={styles.info}>
                        {isLoading ? (
                            <Skeleton
                                variant="text"
                                width={200}
                                sx={{ fontSize: "1rem", marginLeft: "1rem" }}
                            />
                        ) : (
                            product.title
                        )}
                    </span>
                </div>
            </td>
            <td>
                {isLoading ? (
                    <Skeleton height={50} />
                ) : (
                    <QuantityGroup
                        quantity={quantity}
                        onChange={setQuantity}
                    />
                )}
            </td>
            <td>
                <span className={styles.info}>
                    {isLoading ? (
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                        />
                    ) : (
                        `$${product.price}`
                    )}
                </span>
            </td>
            <td>
                <strong className={styles.info}>
                    {isLoading ? (
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                        />
                    ) : (
                        `$${quantity * product.price}`
                    )}
                </strong>
            </td>
            <td>
                {!isLoading && (
                    <DeleteForever
                        className={cx(styles.action, styles.delete)}
                        sx={{
                            transition: "transform 200ms ease-in-out;",
                        }}
                        onClick={handleRemoveProduct}
                    />
                )}
                {item.quantity !== quantity ? (
                    <Done
                        className={cx(styles.action, styles.save)}
                        sx={{
                            transition: "transform 200ms ease-in-out;",
                        }}
                        onClick={handleUpdateProduct}
                    />
                ) : null}
            </td>
        </tr>
    );
}
