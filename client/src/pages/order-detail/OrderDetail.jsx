import React from "react";
import styles from "./OrderDetail.module.css";
import { useQuery } from "react-query";
import { NavLink, useParams } from "react-router-dom";
import { getOrderDetailService } from "../../services/order.service";
import { useSelector } from "react-redux";
import { getUserId } from "../../redux/selectors";
import Loader from "../../components/Loader/Loader";
import Table from "../../components/Table/Table";

export default function OrderDetail() {
    // [STATES]
    const userId = useSelector(getUserId);
    const { orderId } = useParams();
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
                        headers={["Product", "Price", "Quantity"]}
                        data={order.product_list}
                        pagination
                        rowPerPage={5}
                        renderItem={ProductRow}
                        keyExtractor={(item) => item.product._id}
                    />
                </div>
            </div>
        </div>
    );
}
// [CUSTOM RENDERED ELEMENTS]
const ProductRow = React.memo(({ item }) => {
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
                <span className={styles.info}>${item.price}</span>
            </td>
            <td>
                <span className={styles.info}>{item.quantity}</span>
            </td>
        </tr>
    );
});
