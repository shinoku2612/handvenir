import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import { useId } from "react";
import cx from "../../../utils/class-name";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ children, ...props }) {
    const inputId = useId();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    function handleSearchProduct(e) {
        e.preventDefault();
        const searchLink = `/products?search=${searchQuery}`;
        setSearchQuery("")
        navigate(searchLink);
    }
    return (
        <form
            className={styles.searchBar}
            onSubmit={handleSearchProduct}
            {...props}
        >
            <label
                htmlFor={inputId}
                className={styles.iconContainer}
            >
                <Search className={styles.icon} />
            </label>
            <input
                autoComplete="off"
                id={inputId}
                type="text"
                className={styles.searchField}
                placeholder="Find your love..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
            />
            <button className={cx("btn btn-rounded", styles.searchBtn)}>
                Search
            </button>
        </form>
    );
}
