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
import errorSVG from "../assets/images/error.svg";
import orderConfirmSVG from "../assets/images/order-confirm.svg";
import offlineSVG from "../assets/images/disconnect.svg";

// Info page
const Info = lazy(() => import("../pages/info/Info"));
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
const ShoppingHistory = lazy(() =>
    import("../pages/profile/main/shopping-history/ShoppingHistory"),
);
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
// Checkout page
const Checkout = lazy(() => import("../pages/checkout/Checkout"));

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
            errorElement: (
                <Info
                    title="Some thing went wrong"
                    image={{ src: errorSVG, styles: { width: "35%" } }}
                    message={{
                        header: "Some thing went wrong!",
                        info: "Maybe you did something wrong.",
                        suggest: "Please re-connect and try again",
                    }}
                    navigator={{ target: "/", title: "Back to home" }}
                />
            ),
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
                            path: PATH.profile.history,
                            element: <ShoppingHistory />,
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
                {
                    path: PATH.checkout,
                    element: <Checkout />,
                    children: [
                        {
                            index: true,
                            element: (
                                <Info
                                    title="Order confirmed"
                                    image={{
                                        src: orderConfirmSVG,
                                    }}
                                    message={{
                                        header: "Successful!",
                                        info: "Order has been created successfully.",
                                        suggest:
                                            "Would you like to continue shopping?",
                                    }}
                                    navigator={{
                                        target: "/" + PATH.products,
                                        title: "Continue shopping",
                                    }}
                                    isChild
                                />
                            ),
                        },
                    ],
                },
            ],
        },
        {
            path: "*",
            element: (
                <Info
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
                <Info
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
            {/* <RouterProvider router={router} /> */}
            <RouterProvider router={isOnline ? router : offlineRouter} />
        </Suspense>
    );
}
