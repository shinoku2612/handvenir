import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ProductItem from "../../components/ProductItem/ProductItem";
import { getCategories } from "../../services/category.service";
import {
    filterProductService,
    findProductService,
    getAllProductService,
} from "../../services/product.service";
import Category from "./category/Category";
import ExpandList from "./category/expand-list/ExpandList";
import Sort from "./category/sort/Sort";
import ProductsHeader from "./products-header/ProductsHeader";
import styles from "./Products.module.css";
import { useSearchParams } from "react-router-dom";

export default function Products() {
    // [API QUERIES]
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search");
    const filterQuery = searchParams.get("category");
    const { data: products = [] } = useQuery(
        ["product-list", searchQuery, filterQuery],
        () => {
            if (!searchQuery && !filterQuery) return getAllProductService();
            if (searchQuery) return findProductService(searchQuery);
            if (filterQuery) return filterProductService(filterQuery);
        },
    );
    const { data: categories = [] } = useQuery("categories", getCategories);

    // [STATES]
    const [criteria, setCriteria] = useState([]);
    const [sortCriteria, setSortCriteria] = useState("");

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Products | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [HANDLER FUNCTIONS]
    function handleSetCriteria({ name, slug }) {
        setCriteria((prev) => {
            const isSelected = prev.some((p) => p.slug === slug);
            if (isSelected) return prev.filter((p) => p.slug !== slug);
            return prev.concat({ name, slug });
        });
    }
    function handleClearFilter() {
        setCriteria([]);
    }

    // [RENDER]
    return (
        <div className={styles.products}>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div className={styles.productSidebar}>
                            <Category label="Sorts">
                                <Sort
                                    sortCriteria={sortCriteria}
                                    onSetSortCriteria={setSortCriteria}
                                />
                            </Category>
                            <Category
                                label="Filters"
                                action="Clear all"
                                criteria={[]}
                                onClearFilter={handleClearFilter}
                            >
                                <ExpandList
                                    title="Categories"
                                    categories={categories}
                                    criteria={criteria}
                                    onSetCriteria={handleSetCriteria}
                                />
                            </Category>
                        </div>
                    </div>
                    <div className="col-9">
                        <ProductsHeader criteria={criteria} />
                        <div className={styles.productList}>
                            {products.map((product) => (
                                <ProductItem
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
