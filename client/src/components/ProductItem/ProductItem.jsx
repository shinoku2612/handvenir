import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProductItem.module.css";
import { FavoriteBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import cx from "../../utils/class-name";

export default function ProductItem({ product, buttonSize }) {
    // [RENDER]
    return (
        <NavLink
            to={`/product/${product.slug}`}
            className={styles.productItem}
        >
            <div className={styles.imageContainer}>
                <img
                    className={styles.productImage}
                    src={product.image}
                    alt={product.title}
                ></img>
                <div className={styles.addWishList}>
                    <FavoriteBorder className={styles.icon} />
                </div>
            </div>
            <div className={styles.productInfo}>
                <span className={styles.productName}>{product.title}</span>
                <span className={styles.productPrice}>{product.price}</span>
            </div>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.productRating}>
                <Rating
                    size="small"
                    readOnly
                    value={product.ratingPoint}
                    precision={0.1}
                    className={styles.ratingBar}
                />
                <span className={styles.ratingCount}>
                    ({product.ratingCount})
                </span>
            </div>
            <div className={styles.actionContainer}>
                <div
                    className={cx("btn", "btn-rounded", styles.addCartBtn)}
                    style={{ fontSize: buttonSize }}
                >
                    Add to Cart
                </div>
            </div>
        </NavLink>
    );
}
