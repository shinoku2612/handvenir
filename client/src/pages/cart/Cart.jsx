import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styles from "./Cart.module.css";
import { Checkbox, Skeleton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import QuantityGroup from "../../components/QuantityGroup/QuantityGroup";
import Table from "../../components/Table/Table";
import { getCart } from "../../services/cart.service";
import { getProductByIdService } from "../../services/product.service";
import { urlFor } from "../../utils/sanity-client";
import Loader from "../../components/Loader/Loader";

export default function Cart() {
    // [QUERIES]
    const { data: cart } = useQuery("cart", getCart);

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Cart | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [RENDER]
    if (cart === undefined) return <Loader variant="overlay" />;
    if (cart.length === 0) return <h3>Your cart is empty</h3>;

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
                            data={cart}
                            pagination
                            rowPerPage={5}
                            renderItem={ProductRow}
                            keyExtractor={(item, index) => item._id}
                        />
                    </div>
                    <div className={styles.orderSummary}>
                        <h3 className={styles.cartHeader}>Order summary</h3>
                        <div className={styles.summaryContainer}>
                            <div className={styles.summaryInfo}>
                                <span className={styles.summaryLabel}>
                                    Subtotal
                                </span>
                                <span className={styles.summaryValue}>365</span>
                            </div>
                            <div className={styles.summaryInfo}>
                                <span className={styles.summaryLabel}>
                                    Estimated shipping
                                </span>
                                <span className={styles.summaryValue}>9</span>
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
                                <span className={styles.totalValue}>374</span>
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
                            src={urlFor(product.image)}
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
                            product.name
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
                        product.price
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
                        quantity * product.price
                    )}
                </strong>
            </td>
            <td>
                {!isLoading && (
                    <DeleteForever
                        className={styles.action}
                        sx={{
                            transition: "transform 200ms ease-in-out;",
                        }}
                    />
                )}
            </td>
        </tr>
    );
}
