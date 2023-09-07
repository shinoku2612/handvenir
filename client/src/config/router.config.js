import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    RouterProvider,
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import Loader from "../components/Loader/Loader";
import Layout from "../layouts/Layout";
import { getUserId } from "../redux/selectors";
import { PATH } from "./constant.config";
import pageNotFoundSVG from "../assets/images/page-not-found.svg";
import offlineSVG from "../assets/images/disconnect.svg";

// Error page
const Error = lazy(() => import("../pages/error/Error"));
// Authentication pages
const Authentication = lazy(() =>
    import("../pages/authentication/Authentication"),
);
const Register = lazy(() => import("../pages/register/Register"));
const Login = lazy(() => import("../pages/login/Login"));
// Home page
const Home = lazy(() => import("../pages/home/Home"));
// Profile pages
const Profile = lazy(() => import("../pages/profile/Profile"));
const Information = lazy(() =>
    import("../pages/profile/main/information/Information"),
);
const Address = lazy(() => import("../pages/profile/main/address/Address"));
const Credit = lazy(() => import("../pages/profile/main/credit/Credit"));
const ShoppingHistory = lazy(() =>
    import("../pages/profile/main/shopping-history/ShoppingHistory"),
);
const ShopRegister = lazy(() =>
    import("../pages/profile/main/shop-register/ShopRegister"),
);
const ShopList = lazy(() => import("../pages/profile/main/shop-list/ShopList"));
// Product pages
const Products = lazy(() => import("../pages/products/Products"));
const ProductDetail = lazy(() =>
    import("../pages/product-detail/ProductDetail"),
);
// Cart page
const Cart = lazy(() => import("../pages/cart/Cart"));
// Wish list page
const WishList = lazy(() => import("../pages/wish-list/WishList"));
// Order Detail page
const OrderDetail = lazy(() => import("../pages/order-detail/OrderDetail"));

export default function Router() {
    const userId = useSelector(getUserId);
    const router = createBrowserRouter([
        {
            path: PATH.auth,
            element: userId ? (
                <Navigate to={`/${PATH.profile.index}`} />
            ) : (
                <Authentication />
            ),
        },
        {
            path: PATH.register,
            element: userId ? (
                <Navigate to={`/${PATH.profile.index}`} />
            ) : (
                <Register />
            ),
        },
        {
            path: PATH.login,
            element: userId ? (
                <Navigate to={`/${PATH.profile.index}`} />
            ) : (
                <Login />
            ),
        },
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: PATH.profile.index,
                    element: userId ? (
                        <Profile />
                    ) : (
                        <Navigate to={`/${PATH.auth}`} />
                    ),
                    children: [
                        { index: true, element: <Information /> },
                        {
                            path: PATH.profile.address,
                            element: <Address />,
                        },
                        {
                            path: PATH.profile.credit,
                            element: <Credit />,
                        },
                        {
                            path: PATH.profile.history,
                            element: <ShoppingHistory />,
                        },
                        {
                            path: PATH.profile.shop,
                            element: <ShopList />,
                        },
                        {
                            path: PATH.profile.shopRegister,
                            element: <ShopRegister />,
                        },
                    ],
                },
                {
                    path: PATH.products,
                    element: <Products />,
                },
                {
                    path: PATH.productDetail,
                    element: <ProductDetail />,
                },
                {
                    path: PATH.cart,
                    element: <Cart />,
                },
                {
                    path: PATH.wishList,
                    element: <WishList />,
                },
                {
                    path: PATH.orderDetail,
                    element: <OrderDetail />,
                },
            ],
        },
        {
            path: "*",
            element: (
                <Error
                    title="Not found"
                    image={{ src: pageNotFoundSVG }}
                    message={{
                        header: "Whoops! Lost in space?",
                        info: "The page you're looking for isn't found.",
                        suggest: "We suggest you back to home",
                    }}
                    navigator={{ target: "/", title: "Back to home" }}
                />
            ),
        },
    ]);
    const offlineRouter = createBrowserRouter([
        {
            path: "*",
            element: (
                <Error
                    title="No Internet"
                    image={{ src: offlineSVG }}
                    message={{
                        header: "Whoops! You are offline?",
                        info: "You are disconnected from our service.",
                        suggest:
                            "Please check your network connection and try again",
                    }}
                />
            ),
        },
    ]);

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        window.ononline = function () {
            setIsOnline(true);
        };
        window.onoffline = function () {
            setIsOnline(false);
        };
    });
    return (
        <Suspense fallback={<Loader />}>
            <RouterProvider router={isOnline ? router : offlineRouter} />
        </Suspense>
    );
}
