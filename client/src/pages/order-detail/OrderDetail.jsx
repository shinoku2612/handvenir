import React, { useRef } from "react";
import styles from "./OrderDetail.module.css";
import { useQuery } from "react-query";
import { NavLink, useParams } from "react-router-dom";
import { getOrderDetailService } from "../../services/order.service";
import { useSelector } from "react-redux";
import { getUserId } from "../../redux/selectors";
import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";
import Review from "../../components/Review/Review";

export default function OrderDetail() {
    // [STATES]
    const userId = useSelector(getUserId);
    const { orderId } = useParams();
    const reviewRef = useRef();
    // [QUERIES]
    const { isLoading, data: order } = useQuery(orderId, () =>
        getOrderDetailService(userId, orderId),
    );
    // [RENDER]
    if (isLoading) return <Loader variant="overlay" />;
    return (
        <div className={styles.orderDetail}>
            <div className="container">
                <div className={styles.detailContainer}>
                    <h3 className={styles.detailHeader}>Order details</h3>
                    <Table
                        headers={[
                            "Product",
                            "Description",
                            "Price",
                            "Quantity",
                            "",
                        ]}
                        data={order.product_list}
                        pagination
                        rowPerPage={5}
                        renderItem={ProductRow}
                        keyExtractor={(item) => item.product._id}
                        onOpenReview={(productId) =>
                            reviewRef.current.show(productId)
                        }
                    />
                </div>
            </div>
            <Review
                userId={userId}
                ref={reviewRef}
            />
        </div>
    );
}
// [CUSTOM RENDERED ELEMENTS]
const ProductRow = React.memo(({ item, onOpenReview }) => {
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
