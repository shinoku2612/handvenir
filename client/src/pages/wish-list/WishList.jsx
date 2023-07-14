import React, { lazy, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styles from "./WishList.module.css";
import { Skeleton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import Table from "../../components/Table/Table";
import { getProductByIdService } from "../../services/product.service";
import Loader from "../../components/Loader/Loader";
import { getUserId } from "../../redux/selectors";
import cx from "../../utils/class-name";
import {
    getWishListService,
    removeFromWishListService,
} from "../../services/wish-list.service";
import emptyWishListSVG from "../../assets/images/wish-list.svg";
// Error page
const Error = lazy(() => import("../error/Error"));

export default function WishList() {
    // [STATES]
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    // [QUERIES]
    const { isLoading, data: wishList } = useQuery("wish-list", () =>
        getWishListService(userId, dispatch),
    );

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Wish List | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [RENDER]
    if (isLoading) return <Loader variant="overlay" />;
    if (!wishList)
        return (
            <Error
                image={{ src: emptyWishListSVG, styles: { width: "32%" } }}
                title="Empty List"
                message={{
                    header: "Don't have any favorite product!",
                    info: "Look like you have not added anything to your wish list.",
                    suggest: "We suggest you go to shop",
                }}
                navigator={{ target: "/products", title: "Shop now" }}
                isChild
            />
        );

    return (
        <div className={styles.wishList}>
            <div className="container">
                <div className={styles.wishListContainer}>
                    <div className={styles.wishListProductContainer}>
                        <h3 className={styles.wishListHeader}>My favorite</h3>
                        <Table
                            headers={[
                                "Product",
                                "Description",
                                "Price",
                                "Action",
                            ]}
                            data={wishList.product_list}
                            pagination
                            rowPerPage={4}
                            renderItem={ProductRow}
                            keyExtractor={(item) => item.productId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

// [CUSTOM RENDERED ELEMENTS]
function ProductRow({ item }) {
    // [QUERIES]
    const { isLoading, data: product } = useQuery(
        ["single-product", item.productId],
        () => getProductByIdService(item.productId),
    );
    const queryClient = useQueryClient();

    // [STATES]
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();

    // [HANDLER FUNCTIONS]
    async function handleRemoveProduct() {
        try {
            await removeFromWishListService(userId, dispatch, item.productId);
            queryClient.invalidateQueries("wish-list");
        } catch (error) {
            console.log(error.message);
        }
    }

    // [RENDER]
    return (
        <tr>
            <td>
                <div className={styles.productInfo}>
                    {isLoading ? (
                        <Skeleton
                            width={100}
                            height={80}
                        />
                    ) : (
                        <img
                            src={product.image}
                            alt={product.name}
                            className={styles.image}
                        />
                    )}
                    <span className={styles.info}>
                        {isLoading ? (
                            <Skeleton
                                variant="text"
                                width={200}
                                sx={{ fontSize: "1rem", marginLeft: "1rem" }}
                            />
                        ) : (
                            product.title
                        )}
                    </span>
                </div>
            </td>
            <td>
                <span className={styles.description}>
                    {isLoading ? (
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                        />
                    ) : (
                        product.description
                    )}
                </span>
            </td>
            <td>
                <span className={styles.info}>
                    {isLoading ? (
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "1rem" }}
                        />
                    ) : (
                        `$${product.price}`
                    )}
                </span>
            </td>
            <td>
                {!isLoading && (
                    <DeleteForever
                        className={cx(styles.action, styles.delete)}
                        sx={{
                            transition: "transform 200ms ease-in-out;",
                        }}
                        onClick={handleRemoveProduct}
                    />
                )}
            </td>
        </tr>
    );
}
