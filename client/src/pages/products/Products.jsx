import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ProductItem from '../../components/ProductItem/ProductItem';
import { getCategories } from '../../services/category.service';
import { getAllProducts } from '../../services/product.service';
import Category from './category/Category';
import ExpandList from './category/expand-list/ExpandList';
import Sort from './category/sort/Sort';
import ProductsHeader from './products-header/ProductsHeader';
import styles from './Products.module.css';

export default function Products() {
    // [API QUERIES]
    const { data: products = [] } = useQuery('product-list', getAllProducts);
    const { data: categories = [] } = useQuery('categories', getCategories);

    // [STATES]
    const [criteria, setCriteria] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('');

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Products | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [HANDLER FUNCTIONS]
    function handleSetCriteria(value) {
        setCriteria((prev) => {
            if (prev.includes(value)) return prev.filter((p) => p !== value);
            return prev.concat(value);
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
                                    title="Food type"
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
