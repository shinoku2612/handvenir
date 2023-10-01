import { Chip } from "@mui/material";
import React from "react";
import styles from "./ProductsHeader.module.css";
import { useNavigate } from "react-router-dom";
import { checkType } from "../../../utils/helper";

export default function ProductsHeader({ criteria, query }) {
    const navigate = useNavigate();
    function handleFilter() {
        let url = "/products";
        if (checkType(query) === "object") {
            const queryString = Object.keys(query)
                .reduce(
                    (urlString, key) =>
                        query[key] !== undefined
                            ? urlString + `${key}=${query[key]}&`
                            : urlString,
                    "?",
                )
                .slice(0, -1);
            url += queryString;
        }
        const filterQueryList = criteria.map((c) => c.slug);
        const filterQuery = filterQueryList.join(",");
        url += `&category=${filterQuery}`;
        navigate(url);
    }
    return (
        <div className={styles.listHeader}>
            <div className={styles.filterCritetia}>
                {criteria.map((c) => (
                    <Chip
                        key={c.slug}
                        label={c.name}
                        style={{
                            marginRight: "0.625rem",
                        }}
                        color="primary"
                        variant="outlined"
                    />
                ))}
            </div>
            <button
                className="btn btn-primary text-small"
                disabled={criteria.length === 0}
                onClick={handleFilter}
            >
                Search
            </button>
        </div>
    );
}
