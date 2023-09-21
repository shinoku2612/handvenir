import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { getProductBySlugService } from "../../services/product.service";
import { Rating } from "@mui/material";
import QuantityGroup from "../../components/QuantityGroup/QuantityGroup";
import Comment from "./comment/Comment";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getUserId } from "../../redux/selectors";
import { addToCartService } from "../../services/cart.service";
import { getProductReviewService } from "../../services/review.service";
import { formatDDMMYYYYHHMM } from "../../utils/helper";

export default function ProductDetail() {
    // [API QUERIES]
    const { slug } = useParams();
    const { isLoading: productLoading, data: product } = useQuery(
        ["single-product", slug],
        () => getProductBySlugService(slug),
    );
    const { isLoading: commentLoading, data: commentList } = useQuery(
        ["product-review", product?._id],
        () => getProductReviewService(product?._id),
        { enabled: !!product },
    );

    // [STATES]
    const [quantity, setQuantity] = useState(1);
    const userId = useSelector(getUserId);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    // [HANDLER FUNCTIONS]
    async function handleAddToCart(e) {
        try {
            e.preventDefault();
            e.stopPropagation();
            const cartItem = {
                productId: product._id,
                quantity: quantity,
            };
            await addToCartService(userId, dispatch, cartItem);
        } catch (error) {
            console.log("Add to current device");
        }
    }
    function handleInputComment(e) {
        setComment(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    }

    // [RENDER]
    if (productLoading || commentLoading) return <Loader variant="overlay" />;
    return (
        <div className={styles.productDetail}>
            <div className="container">
                <section className={styles.productInfoContainer}>
                    <div className={styles.productImage}>
                        <img
                            src={product.image}
                            alt={product.title}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.productInfo}>
                        <h3 className={styles.productName}>{product.title}</h3>
                        <div className={styles.productRating}>
                            <span className={styles.ratingPoint}>
                                {product.rating_point}
                            </span>
                            <Rating
                                size="small"
                                readOnly
                                value={product.rating_point}
                                precision={0.1}
                                className={styles.ratingBar}
                            />
                            <span className={styles.ratingCount}>
                                {product.rating_count}
                            </span>
                        </div>
                        <div className={styles.productPrice}>
                            ${product.price}
                        </div>
                        <div className={styles.productInfoGroup}>
                            <span className={styles.infoLabel}>Shipping</span>
                            <div className={styles.infoValue}>
                                <p className={styles.shippingAddress}>
                                    Shipping from Vietnam
                                </p>
                            </div>
                        </div>
                        <div className={styles.productInfoGroup}>
                            <span className={styles.infoLabel}>Quantity</span>
                            <div className={styles.infoValue}>
                                <QuantityGroup
                                    quantity={quantity}
                                    onChange={setQuantity}
                                />
                                <span className={styles.productAvailable}>
                                    1364 pieces available
                                </span>
                            </div>
                        </div>
                        <div className="btn-groups">
                            <button
                                className="btn btn-danger"
                                onClick={handleAddToCart}
                            >
                                Add to cart
                            </button>
                            <button className="btn btn-danger btn-outlined m-inline-1">
                                Add to wish lish
                            </button>
                        </div>
                    </div>
                </section>
                <section className={styles.productDetails}>
                    <div className={styles.productSpecification}>
                        <h3 className={styles.sectionHeader}>
                            Product Specifications
                        </h3>
                        <div className={styles.detailGroup}>
                            <div className={styles.specification}>
                                <span className={styles.specificationLabel}>
                                    Category
                                </span>
                                <strong className={styles.specificationValue}>
                                    Camera
                                </strong>
                            </div>
                            <div className={styles.specification}>
                                <span className={styles.specificationLabel}>
                                    Brand
                                </span>
                                <strong className={styles.specificationValue}>
                                    ShinPay
                                </strong>
                            </div>
                            <div className={styles.specification}>
                                <span className={styles.specificationLabel}>
                                    Stock
                                </span>
                                <span className={styles.specificationValue}>
                                    1364
                                </span>
                            </div>
                            <div className={styles.specification}>
                                <span className={styles.specificationLabel}>
                                    Ships from
                                </span>
                                <span className={styles.specificationValue}>
                                    Vietnam
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.productSpecification}>
                        <h3 className={styles.sectionHeader}>
                            Product Descriptions
                        </h3>
                        <div className={styles.detailGroup}>
                            <span className={styles.description}>
                                {product.description}
                            </span>
                        </div>
                    </div>
                </section>
                <section className={styles.productReview}>
                    <h3 className={styles.sectionHeader}>
                        <span>Product Ratings</span>
                        <span className={styles.productReviewHeader}>
                            {product.rating_point}
                        </span>
                    </h3>
                    <div className={styles.reviewContainer}>
                        {user && (
                            <div className={styles.reviewWriter}>
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className={styles.owner}
                                />
                                <textarea
                                    name="commentBox"
                                    id="comment"
                                    className={styles.reviewBox}
                                    value={comment}
                                    onChange={handleInputComment}
                                ></textarea>
                            </div>
                        )}
                        {commentList.map((comment) => (
                            <Comment
                                key={comment._id}
                                author={{
                                    name: comment.user.name,
                                    avatar: comment.user.avatar,
                                }}
                                comment={{
                                    rating: comment.rating,
                                    like: comment.like,
                                    createdAt: formatDDMMYYYYHHMM(
                                        comment.createdAt,
                                    ),
                                    content: comment.comment,
                                }}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
