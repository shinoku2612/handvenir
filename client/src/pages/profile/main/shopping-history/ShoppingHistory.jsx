import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Select from "../../../../components/Select/Select";
import Table from "../../../../components/Table/Table";
import styles from "./ShoppingHistory.module.css";
import { useQuery } from "react-query";
import { getOrderService } from "../../../../services/order.service";
import { useSelector } from "react-redux";
import { getUserId } from "../../../../redux/selectors";
import Loader from "../../../../components/Loader/Loader";
import { formatDDMMYYYY } from "../../../../utils/helper";

export default function ShoppingHistory() {
    // [STATES]
    const userId = useSelector(getUserId);
    const [totalSort, setTotalSort] = useState("None");
    const [statusFilter, setStatusFilter] = useState("All");
    const [paymentMethod, setPaymentMethod] = useState("All");

    // [QUERIES]
    const { isLoading, data, refetch } = useQuery("order", () =>
        getOrderService(userId, {
            total: totalSort,
            method: paymentMethod,
            status: statusFilter,
        }),
    );
    useEffect(() => {
        refetch();
    }, [totalSort, paymentMethod, statusFilter, refetch]);

    // [RENDER]
    if (isLoading) return <Loader variant="overlay" />;
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.header}>Shopping history</h3>
            <div className={styles.content}>
                <section className={styles.filterContainer}>
                    <div className={styles.filterGroup}>
                        <Select
                            classNames={styles.filterSelect}
                            label="Total"
                            defaultValue={totalSort}
                            renderData={["None", "Increase", "Decrease"]}
                            onSelect={setTotalSort}
                        />
                        <Select
                            classNames={styles.filterSelect}
                            label="Payment method"
                            defaultValue={paymentMethod}
                            renderData={["All", "COD", "Momo", "Bank"]}
                            onSelect={setPaymentMethod}
                        />
                        <Select
                            classNames={styles.filterSelect}
                            label="Status"
                            defaultValue={statusFilter}
                            renderData={[
                                "All",
                                "Completed",
                                "Pending",
                                "Shipping",
                                "Canceled",
                            ]}
                            onSelect={setStatusFilter}
                        />
                    </div>
                </section>
                <Table
                    headers={[
                        "Date",
                        "Status",
                        "Payment",
                        "Address",
                        "Total",
                        "",
                    ]}
                    data={data.data}
                    renderItem={Order}
                    keyExtractor={(item) => item.date}
                    pagination
                    pageCount={Math.ceil(data.size / 3)}
                    rowPerPage={3}
                    onPaginate={refetch}
                />
            </div>
        </div>
    );
}

// [CUSTOM RENDERED ELEMENTS]
function Order({ item }) {
    return (
        <tr>
            <td>{formatDDMMYYYY(item.createdAt)}</td>
            <td>
                <span className={`status ${item.status}`}>{item.status}</span>
            </td>
            <td>
                <strong>{item.method}</strong>
            </td>
            <td>{item.address}</td>
            <td>
                <strong>${item.total}</strong>
            </td>
            <td>
                <NavLink
                    to={`/order/${item._id}`}
                    className="btn btn-primary btn-rounded text-small"
                >
                    Details
                </NavLink>
            </td>
        </tr>
    );
}
