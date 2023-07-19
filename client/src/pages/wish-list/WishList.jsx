import React, { lazy, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styles from "./WishList.module.css";
import { Skeleton } from "@mui/material";
import { DeleteForever, Upload } from "@mui/icons-material";
import Table from "../../components/Table/Table";
import { getProductByIdService } from "../../services/product.service";
import Loader from "../../components/Loader/Loader";
import { getUser, getUserId } from "../../redux/selectors";
import cx from "../../utils/class-name";
import {
    getLocalWishList,
    getWishListService,
    removeFromWishListService,
    syncLocalWishListService,
} from "../../services/wish-list.service";
import emptyWishListSVG from "../../assets/images/wish-list.svg";
import { NavLink } from "react-router-dom";
import { PATH } from "../../config/constant.config";
import PopUp from "../../components/PopUp/PopUp";
// Error page
const Error = lazy(() => import("../error/Error"));

export default function WishList() {
    // [STATES]
    const userId = useSelector(getUserId);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    // [QUERIES]
    const { isLoading, data } = useQuery("wish-list", () =>
        Promise.all([
            getWishListService(userId, dispatch),
            getLocalWishList(),
        ]).then(([wishList, localWishList]) => ({ wishList, localWishList })),
    );

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Wish List | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [HANDLER FUNCTIONS]
    const handleSyncWishList = async () => {
        await syncLocalWishListService(userId);
        window.location.replace(PATH.wishList);
    };

    // [RENDER]
    if (isLoading) return <Loader variant="overlay" />;
    if (!data.wishList)
        return (
            <React.Fragment>
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
                {!!(user && data.localWishList) ? (
                    <PopUp
                        title="Synchronize your wish list"
                        message="We noticed you currently have a shopping wish list on your device, would you like to upload it to sync with your account?"
                        handler={handleSyncWishList}
                    >
                        <Upload
                            sx={{
                                color: "",
                                lineHeight: 0,
                            }}
                        />
                    </PopUp>
                ) : null}
            </React.Fragment>
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
                            data={data.wishList.product_list}
                            pagination
                            rowPerPage={4}
                            renderItem={ProductRow}
                            keyExtractor={(item) => item.productId}
                        />
                    </div>
                </div>
            </div>
            {!!(user && data.localWishList) ? (
                <PopUp
                    title="Synchronize your wish list"
                    message="We noticed you currently have a shopping wish list on your device, would you like to upload it to sync with your account?"
                    handler={handleSyncWishList}
                >
                    <Upload
                        sx={{
                            color: "",
                            lineHeight: 0,
                        }}
                    />
                </PopUp>
            ) : null}
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
    if (isLoading)
        return (
            <tr>
                <td>
                    <div className={styles.productInfo}>
                        <Skeleton
                            width={100}
                            height={80}
                        />
                        <Skeleton
                            variant="text"
                            width={200}
                            sx={{
                                fontSize: "1rem",
                                marginLeft: "1rem",
                            }}
                        />
                    </div>
                </td>
                <td>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                    />
                </td>
                <td>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                    />
                </td>
                <td></td>
            </tr>
        );
    return (
        <tr>
            <td>
                <NavLink
                    to={`/product/${product.slug}`}
                    className={styles.productInfo}
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className={styles.image}
                    />
                    <span className={styles.info}>{product.title}</span>
                </NavLink>
            </td>
            <td>
                <span className={styles.description}>
                    {product.description}
                </span>
            </td>
            <td>
                <span className={styles.info}>${product.price}</span>
            </td>
            <td>
                <DeleteForever
                    className={cx(styles.action, styles.delete)}
                    sx={{
                        transition: "transform 200ms ease-in-out;",
                    }}
                    onClick={handleRemoveProduct}
                />
            </td>
        </tr>
    );
}
