import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import React, { useRef } from 'react';
import styles from './HomeSection.module.css';
import ProductItem from '../../../components/ProductItem/ProductItem';
import { getBrowserWidth } from '../../../utils/helper';
import ProductSkeletion from '../../../components/ProductItem/ProductSkeleton';

export default function HomeSection({
    isLoading,
    data,
    title = 'Home Section',
}) {
    // [STATES]
    const productListRef = useRef();

    // [HANDLER FUNCTIONS]
    function handleSlide(direction) {
        return function () {
            if (direction === 'left') {
                productListRef.current.scrollBy({
                    left: -0.75 * getBrowserWidth(),
                });
            } else if (direction === 'right') {
                productListRef.current.scrollBy({
                    left: 0.75 * getBrowserWidth(),
                });
            }
        };
    }

    // [RENDER]
    return (
        <div className={styles.homeSection}>
            <h3 className={styles.homeSectionHeader}>{title}</h3>

            <div className={styles.container}>
                <div
                    role="button"
                    className={styles.actionBtnLeft}
                    onClick={handleSlide('left')}
                >
                    <ChevronLeft />
                </div>
                <div className={styles.sectionContainer} ref={productListRef}>
                    {isLoading
                        ? Array(4)
                              .fill(0)
                              .map((_, index) => (
                                  <ProductSkeletion key={index} />
                              ))
                        : data.map((item) => (
                              <ProductItem key={item._id} product={item} />
                          ))}
                </div>
                <div
                    role="button"
                    className={styles.actionBtnRight}
                    onClick={handleSlide('right')}
                >
                    <ChevronRight />
                </div>
            </div>
        </div>
    );
}
