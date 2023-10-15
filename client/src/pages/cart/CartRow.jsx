import React, { useEffect, useRef, useState } from "react";
import styles from "./Cart.module.css";
import { useQuery } from "react-query";
import { getProductByIdService } from "../../services/product.service";
import { Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";
import QuantityGroup from "../../components/QuantityGroup/QuantityGroup";
import { DeleteForever } from "@mui/icons-material";
import cx from "../../utils/class-name";
const CartRow = React.memo(
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
export default CartRow;
