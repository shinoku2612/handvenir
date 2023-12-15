import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ProductItem from "../../components/ProductItem/ProductItem";
import { getCategories } from "../../services/category.service";
import { getAllProductService } from "../../services/product.service";
import Category from "./category/Category";
import ExpandList from "./category/expand-list/ExpandList";
import Sort from "./category/sort/Sort";
import ProductsHeader from "./products-header/ProductsHeader";
import styles from "./Products.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SORT } from "../../config/constant.config";

export default function Products() {
    // [STATES]
    const [criteria, setCriteria] = useState([]);
    const [sortCriteria, setSortCriteria] = useState(SORT[0].value);
    const navigate = useNavigate();
    // [API QUERIES]
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase();
    const filterQuery = searchParams.get("category")?.toLowerCase();
    const { data: products = [], refetch } = useQuery("product-list", () =>
        getAllProductService({
            search: searchQuery,
            category: filterQuery,
            sort: sortCriteria,
        }),
    );
    const { data: categories = [] } = useQuery("categories", getCategories);

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Products | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);
    useEffect(() => {
        refetch();
    }, [searchQuery, filterQuery, sortCriteria, refetch]);

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
        navigate(window.location.pathname);
    }

    // [RENDER]
    return (
        <div className={styles.products}>
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
            <div style={{ marginTop: 10 }}>
                <ProductsHeader
                    criteria={criteria}
                    query={{
                        search: searchQuery,
                        sort: sortCriteria,
                    }}
                />
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
    );
}
