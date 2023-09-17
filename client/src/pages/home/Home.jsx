import React, { useEffect } from "react";
import { useQuery } from "react-query";
import Carousel from "../../components/Carousel/Carousel";
import HomeSection from "./home-section/HomeSection";
import styles from "./Home.module.css";
import { getLatestProductService } from "../../services/product.service";

export default function Home() {
    // [API QUERIES]
    const { isLoading: latestProductLoading, data: latestProductList } =
        useQuery("latest-product-list", () => getLatestProductService(6));

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Home | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [RENDER]
    return (
        <React.Fragment>
            <Carousel
                autoplay
                delay={5000}
                duration={500}
            >
                <div className={styles.slideImageContainer}>
                    <img
                        src="https://previews.123rf.com/images/ssstocker/ssstocker1604/ssstocker160400054/55346137-creative-handmade-workshop-banner-handmade-and-creativity-background-vector-illustration.jpg"
                        alt="Gây quỹ Trung thu Yêu thương"
                        className={styles.slideImage}
                    />
                </div>
            </Carousel>
            <div className="container">
                <HomeSection
                    data={latestProductList}
                    isLoading={latestProductLoading}
                    title="Today Best Deals For You!"
                />
                <HomeSection
                    data={latestProductList}
                    isLoading={latestProductLoading}
                    title="Weekly Popular Products"
                />
                <HomeSection
                    data={latestProductList}
                    isLoading={latestProductLoading}
                    title="New Products"
                />
            </div>
        </React.Fragment>
    );
}
