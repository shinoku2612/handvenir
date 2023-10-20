import React, { lazy, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styles from "./WishList.module.css";
import Table from "../../components/Table/Table";
import Loader from "../../components/Loader/Loader";
import { getUser, getUserId } from "../../redux/selectors";
import {
    getLocalWishList,
    getWishListService,
    syncLocalWishListService,
} from "../../services/wish-list.service";
import emptyWishListSVG from "../../assets/images/wish-list.svg";
import PopUp from "../../components/PopUp/PopUp";
import { Upload } from "@mui/icons-material";
import WishListRow from "./WishListRow";
// Error page
const Info = lazy(() => import("../info/Info"));

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
    const queryClient = useQueryClient();

    // [SIDE EFFECTS]
    // --Change app title when switching page--
    useEffect(() => {
        document.title = `Wish List | ${process.env.REACT_APP_SITE_TITLE}`;
    }, []);

    // [HANDLER FUNCTIONS]
    const handleSyncWishList = async () => {
        await syncLocalWishListService(userId);
        queryClient.invalidateQueries("wish-list");
    };

    // [RENDER]
    if (isLoading) return <Loader variant="overlay" />;
    if (!data.wishList)
        return (
            <React.Fragment>
                <Info
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
                            renderItem={WishListRow}
                            keyExtractor={(item) => item.product}
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
