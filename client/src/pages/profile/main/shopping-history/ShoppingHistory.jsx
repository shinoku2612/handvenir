import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Select from '../../../../components/Select/Select';
import Table from '../../../../components/Table/Table';
import styles from './ShoppingHistory.module.css';

export default function ShoppingHistory() {
    // [STATES]
    const [sortFilter, setSortFilter] = useState('None');
    const [statusFilter, setStatusFilter] = useState('All');
    const [paymentMethod, setPaymentMethod] = useState('All');

    // [RENDER]
    return (
        <div className={styles.infoContainer}>
            <h3 className={styles.header}>Shopping history</h3>
            <div className={styles.content}>
                <section className={styles.filterContainer}>
                    <div className={styles.filterGroup}>
                        <Select
                            classNames={styles.filterSelect}
                            label="Total"
                            defaultValue={sortFilter}
                            renderData={['None', 'Increase', 'Decrease']}
                            onSelect={setSortFilter}
                        />
                        <Select
                            classNames={styles.filterSelect}
                            label="Payment method"
                            defaultValue={statusFilter}
                            renderData={['All', 'Credits', 'Cash on delivery']}
                            onSelect={setStatusFilter}
                        />
                        <Select
                            classNames={styles.filterSelect}
                            label="Status"
                            defaultValue={paymentMethod}
                            renderData={['All', 'Paid', 'Pending', 'Denied']}
                            onSelect={setPaymentMethod}
                        />
                    </div>
                </section>
                <Table
                    headers={[
                        'Date',
                        'Total',
                        'Payment method',
                        'Status',
                        'Action',
                    ]}
                    pagination
                    data={[
                        {
                            date: 'Jan 1, 2023',
                            total: '$99.99',
                            method: 'COD',
                            status: 'Paid',
                        },
                    ]}
                    renderItem={Order}
                    keyExtractor={(item) => item.date}
                />
            </div>
        </div>
    );
}

// [CUSTOM RENDERED ELEMENTS]
function Order({ item }) {
    return (
        <tr>
            <td>{item.date}</td>
            <td>{item.total}</td>
            <td>{item.method}</td>
            <td>{item.status}</td>
            <td>
                <NavLink
                    to="../address"
                    className="btn btn-primary btn-rounded text-small"
                >
                    Details
                </NavLink>
            </td>
        </tr>
    );
}
