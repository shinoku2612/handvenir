import React, { useEffect, useState } from "react";
import Select from "../../../../components/Select/Select";
import Table from "../../../../components/Table/Table";
import styles from "./ShoppingHistory.module.css";
import { useQuery } from "react-query";
import { getOrderService } from "../../../../services/order.service";
import { useSelector } from "react-redux";
import { getUserId } from "../../../../redux/selectors";
import Loader from "../../../../components/Loader/Loader";
import OrderRow from "./OrderRow";
import { checkType } from "../../../../utils/helper";

const NUMBER_PER_CALL = 3;

export default function ShoppingHistory() {
    // [STATES]
    const userId = useSelector(getUserId);
    const [totalSort, setTotalSort] = useState("None");
    const [statusFilter, setStatusFilter] = useState("All");
    const [paymentMethod, setPaymentMethod] = useState("All");
    const [isRefetched, setIsRefetched] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // [QUERIES]
    const { isLoading, data, refetch } = useQuery("order", () =>
        getOrderService(userId, {
            total: totalSort,
            method: paymentMethod,
            status: statusFilter,
            limit: NUMBER_PER_CALL,
            page: currentPage,
        }),
    );
    function handleFilter(setState, state) {
        setIsRefetched((prev) => prev + 1);
        if (checkType(setState) === "function") return setState(state);
    }
    useEffect(() => {
        refetch();
    }, [currentPage, totalSort, paymentMethod, statusFilter, refetch]);

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
                            renderData={["All", "COD", "PayPal"]}
                            onSelect={(method) =>
                                handleFilter(setPaymentMethod, method)
                            }
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
                            onSelect={(status) =>
                                handleFilter(setStatusFilter, status)
                            }
                        />
                    </div>
                </section>
                <Table
                    headers={[
                        "Date",
                        "Receiver",
                        "Status",
                        "Method",
                        "Address",
                        "Total",
                        "Actions",
                    ]}
                    data={data.data}
                    renderItem={OrderRow}
                    keyExtractor={(item) => item.date}
                    pagination
                    serverPagination
                    size={data.size}
                    rowPerPage={NUMBER_PER_CALL}
                    onPaginate={setCurrentPage}
                    onUpdate={refetch}
                    isRefetched={isRefetched}
                />
            </div>
        </div>
    );
}
