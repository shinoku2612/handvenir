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
import { getUserId } from "../../redux/selectors";
import { addToCartService } from "../../services/cart.service";

export default function ProductDetail() {
    // [API QUERIES]
    const { slug } = useParams();
    const { data: product } = useQuery(["single-product", slug], () =>
        getProductBySlugService(slug),
    );

    // [STATES]
    const [quantity, setQuantity] = useState(1);
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();

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

    // [RENDER]
    if (product === undefined) return <Loader variant="overlay" />;
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
                                {product.ratingPoint}
                            </span>
                            <Rating
                                size="small"
                                readOnly
                                value={product.ratingPoint}
                                precision={0.1}
                                className={styles.ratingBar}
                            />
                            <span className={styles.ratingCount}>
                                {product.ratingCount}
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
                            {product.ratingPoint}
                        </span>
                    </h3>
                    <div className={styles.reviewContainer}>
                        <Comment
                            author={{
                                name: "Shin Nohara",
                                image: "https://file.hstatic.net/200000122283/article/shin-cau-be-but-chi_4017a723e5df4b7d91524dc0bf656c27_1024x1024.jpg",
                            }}
                            comment={{
                                rating: 4.6,
                                createdAt: "2023-02-11 11:24",
                                content:
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis unde totam, rem dolorem temporibus nulla itaque reprehenderit, nisi similique, ratione praesentium possimus in magnam ducimus assumenda molestias ipsum debitis laudantium.",
                                reaction: 123,
                            }}
                        />
                        <Comment
                            author={{
                                name: "Ai Haibara",
                                image: "https://i.pinimg.com/736x/c1/32/9f/c1329fe1416f3388175adf56c763d0a3.jpg",
                            }}
                            comment={{
                                rating: 4.4,
                                createdAt: "2023-02-09 13:56",
                                content:
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis unde totam, rem dolorem temporibus nulla itaque reprehenderit, nisi similique, ratione praesentium possimus in magnam ducimus assumenda molestias ipsum debitis laudantium.",
                                reaction: 13,
                            }}
                        />
                        <Comment
                            author={{
                                name: "Nobita Nobi",
                                image: "https://numeralpaints.com/wp-content/uploads/2021/07/nobita-and-doraemon-paint-by-numbers.jpg",
                            }}
                            comment={{
                                rating: 4.5,
                                createdAt: "2022-12-24 18:15",
                                content:
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis unde totam, rem dolorem temporibus nulla itaque reprehenderit, nisi similique, ratione praesentium possimus in magnam ducimus assumenda molestias ipsum debitis laudantium.",
                                reaction: 133,
                            }}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
