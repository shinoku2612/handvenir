import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Carousel from '../../components/Carousel/Carousel';
import Category from './categories/Category';
import HomeSection from './home-section/HomeSection';
import styles from './Home.module.css';
import {
    getNewProductList,
    getRandomProductList,
} from '../../services/product.service';
import { getBannerList } from '../../services/banner.service';
import { urlFor } from '../../utils/sanity-client';

export default function Home() {
    // [API QUERIES]
    const { isLoading: newProductLoading, data: newProductList } = useQuery(
        'new-product-list',
        () => getNewProductList(6),
    );
    const { isLoading: randomProductLoading, data: randomProductList } =
        useQuery('random-product-list', () => getRandomProductList(6));
    const { data: banners = [] } = useQuery('banner-list', getBannerList);

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Home | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [RENDER]
    return (
        <React.Fragment>
            <Carousel autoplay delay={5000} duration={500}>
                {banners.map((banner) => (
                    <div
                        key={banner._id}
                        className={styles.slideImageContainer}
                    >
                        <img
                            src={urlFor(banner.image)}
                            alt={banner.name}
                            className={styles.slideImage}
                        />
                    </div>
                ))}
            </Carousel>
            <div className="container">
                <Category />
                <HomeSection
                    data={randomProductList}
                    isLoading={randomProductLoading}
                    title="Today Best Deals For You!"
                />
                <HomeSection
                    data={randomProductList}
                    isLoading={randomProductLoading}
                    title="Weekly Popular Products"
                />
                <HomeSection
                    data={newProductList}
                    isLoading={newProductLoading}
                    title="New Products"
                />
            </div>
        </React.Fragment>
    );
}
