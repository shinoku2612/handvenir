import { Chip } from "@mui/material";
import React from "react";
import styles from "./ProductsHeader.module.css";
import { useNavigate } from "react-router-dom";

export default function ProductsHeader({ criteria }) {
    const navigate = useNavigate();
    function handleFilter() {
        const filterQueryList = criteria.map((c) => c.slug);
        const filterQuery = filterQueryList.join(",");
        const filterLink = `/products?category=${filterQuery}`;
        navigate(filterLink);
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
