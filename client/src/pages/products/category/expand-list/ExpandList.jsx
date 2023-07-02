import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Checkbox, Collapse } from "@mui/material";
import React, { useState } from "react";
import styles from "./ExpandList.module.css";

export default function ExpandList({
    title,
    categories = [],
    criteria,
    onSetCriteria,
}) {
    // [STATES]
    const [expand, setExpand] = useState(true);

    // [HANDLER FUNCTIONS]
    function handleExpandList() {
        setExpand((prev) => !prev);
    }

    // [RENDER]
    return (
        <div className={styles.categoryListContainer}>
            <div
                className={styles.categoryListHeader}
                onClick={handleExpandList}
            >
                <p className={styles.categoryName}>{title}</p>
                {expand ? <ExpandLess /> : <ExpandMore />}
            </div>
            <Collapse
                in={expand}
                timeout="auto"
                unmountOnExit
                className={styles.categoryList}
            >
                {categories.map((category) => (
                    <div
                        key={category._id}
                        className={styles.categoryItem}
                        onClick={() =>
                            onSetCriteria({
                                name: category.name,
                                slug: category.slug.current,
                            })
                        }
                    >
                        <Checkbox
                            checked={criteria.some(
                                (c) => c.slug === category.slug.current,
                            )}
                        />
                        <p>{category.name}</p>
                    </div>
                ))}
            </Collapse>
        </div>
    );
}
