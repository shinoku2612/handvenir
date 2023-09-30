import React, { useState, useMemo, useEffect } from "react";
import styles from "./Table.module.css";
import { Pagination } from "@mui/material";
import { checkType } from "../../utils/helper";

export default function Table({
    headers,
    pagination = false,
    rowPerPage = 5,
    pageCount,
    data,
    renderItem: Row,
    keyExtractor,
    onPaginate,
    ...props
}) {
    // [STATES]
    const [page, setPage] = useState(1);
    const renderData = useMemo(() => {
        if (pagination)
            return data.slice((page - 1) * rowPerPage, page * rowPerPage);
        else return data;
    }, [page, pagination, rowPerPage, data]);

    // [HANDLER FUNCTIONS]
    function handleChangePage(event, value) {
        setPage(value);
    }
    useEffect(() => {
        if (checkType(onPaginate) === "function") {
            onPaginate();
        }
    }, [page, onPaginate]);

    // [RENDER]
    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header}
                                scope="col"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {renderData.map((item, index) => (
                        <React.Fragment
                            key={keyExtractor(item, index) || index}
                        >
                            <Row
                                item={item}
                                index={index}
                                {...props}
                            />
                        </React.Fragment>
                    ))}
                </tbody>
                {pagination && (
                    <tfoot>
                        <tr>
                            <td colSpan={headers.length}>
                                <div className={styles.paginationContainer}>
                                    <Pagination
                                        count={
                                            pageCount
                                                ? pageCount
                                                : Math.ceil(
                                                      data.length / rowPerPage,
                                                  )
                                        }
                                        page={page}
                                        onChange={handleChangePage}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                )}
            </table>
        </div>
    );
}
