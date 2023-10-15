import React from "react";
import styles from "./OrderDetail.module.css";
import { NavLink } from "react-router-dom";
const OrderRow = React.memo(({ item, onOpenReview }) => {
    // [RENDER]
    return (
        <tr>
            <td>
                <NavLink
                    to={`/product/${item.product.slug}`}
                    className={styles.productInfo}
                >
                    <img
                        src={item.product.image}
                        alt={item.product.title}
                        className={styles.image}
                    />
                    <span className={styles.info}>{item.product.title}</span>
                </NavLink>
            </td>
            <td>
                <span className={styles.info}>
                    {item.product.description.split("\n").map((text, index) => (
                        <p key={index}>{text}</p>
                    ))}
                </span>
            </td>
            <td>
                <span className={styles.info}>${item.price}</span>
            </td>
            <td>
                <span className={styles.info}>{item.quantity}</span>
            </td>
            <td>
                <button
                    className="btn btn-primary"
                    onClick={() => onOpenReview(item.product._id)}
                >
                    Review
                </button>
            </td>
        </tr>
    );
});
export default OrderRow;
