import React, { useEffect, useState } from 'react';
import styles from './Table.module.css';
import { Pagination } from '@mui/material';

export default function Table({
    headers,
    pagination = false,
    rowPerPage = 5,
    data,
    renderItem: Item,
    keyExtractor,
}) {
    // [STATES]
    const [page, setPage] = useState(1);
    const [renderData, setRenderData] = useState(data);

    // [SIDE EFFECTS]
    // --Pagination data--
    useEffect(() => {
        if (pagination) {
            setRenderData(
                data.slice((page - 1) * rowPerPage, page * rowPerPage),
            );
        }
    }, [page, pagination, rowPerPage, data]);

    // [HANDLER FUNCTIONS]
    function handleChangePage(event, value) {
        setPage(value);
    }

    // [RENDER]
    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header} scope="col">
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
                            {<Item item={item} index={index} />}
                        </React.Fragment>
                    ))}
                </tbody>
                {pagination && (
                    <tfoot>
                        <tr>
                            <td colSpan={headers.length}>
                                <div className={styles.paginationContainer}>
                                    <Pagination
                                        count={Math.ceil(
                                            data.length / rowPerPage,
                                        )}
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
