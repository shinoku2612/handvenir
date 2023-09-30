import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProductItem.module.css";
import { FavoriteBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import cx from "../../utils/class-name";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../redux/selectors";
import { addToCartService } from "../../services/cart.service";
import { addToWishListService } from "../../services/wish-list.service";

export default function ProductItem({ product, buttonSize }) {
    // [STATES]
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();

    // [HANDLER FUNCTIONS]
    async function handleAddToCart(e) {
        try {
            e.preventDefault();
            e.stopPropagation();
            const cartItem = {
                productId: product._id,
                quantity: 1,
            };
            await addToCartService(userId, dispatch, cartItem);
        } catch (error) {
            console.log("Add to current device");
        }
    }
    async function handleAddToWishList(e) {
        try {
            e.preventDefault();
            e.stopPropagation();
            await addToWishListService(userId, dispatch, product._id);
        } catch (error) {
            console.log("Add to current device");
        }
    }
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
                <div
                    className={styles.addWishList}
                    role="button"
                    onClick={handleAddToWishList}
                >
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
                    value={product.rating_point || 0}
                    precision={0.1}
                />
                <span className={styles.ratingCount}>
                    ({product.rating_count || 0})
                </span>
            </div>
            <div className={styles.actionContainer}>
                <button
                    className={cx("btn", "btn-rounded", styles.addCartBtn)}
                    style={{ fontSize: buttonSize }}
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </NavLink>
    );
}
