import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import styles from './Category.module.css';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { getBrowserWidth } from '../../../utils/helper';
import { getCategories } from '../../../services/category.service';
import { urlFor } from '../../../utils/sanity-client';
import { Skeleton } from '@mui/material';

export default function Category() {
    // [API QUERIES]
    const { isLoading, data: categories } = useQuery(
        'categories',
        getCategories,
    );

    // [STATES]
    const categoryRef = useRef();

    // [HANDLER FUNCTIONS]
    function handleScroll(direction) {
        if (direction === 'right') {
            categoryRef.current.scrollBy({
                left: 0.8 * getBrowserWidth(),
            });
        } else if (direction === 'left') {
            categoryRef.current.scrollBy({
                left: -0.8 * getBrowserWidth(),
            });
        }
    }

    // [RENDER]
    return (
        <div className={styles.category}>
            <h3 className={styles.categoryHeader}>Categories</h3>
            <div className={styles.container}>
                <div
                    role="button"
                    className={styles.actionBtnLeft}
                    onClick={() => handleScroll('left')}
                >
                    <ChevronLeft />
                </div>
                <div className={styles.categoryContainer} ref={categoryRef}>
                    {isLoading
                        ? [...Array(7)].map((_, index) => (
                              <Skeleton
                                  key={index}
                                  variant="rounded"
                                  width="100%"
                              >
                                  <div style={{ height: 220 }}></div>
                              </Skeleton>
                          ))
                        : categories.map((category) => (
                              <NavLink
                                  to={`/products?category=${category.slug.current}`}
                                  key={category._id}
                                  className={styles.categoryItem}
                              >
                                  <span className={styles.categoryName}>
                                      {category.name}
                                  </span>
                                  <img
                                      src={urlFor(category.image)}
                                      alt={category.name}
                                      className={styles.image}
                                  />
                              </NavLink>
                          ))}
                </div>
                <div
                    role="button"
                    className={styles.actionBtnRight}
                    onClick={() => handleScroll('right')}
                >
                    <ChevronRight />
                </div>
            </div>
        </div>
    );
}
