import React, { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSelector } from 'react-redux';
import {
    RouterProvider,
    createBrowserRouter,
    Navigate,
} from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Layout from '../layouts/Layout';
import { getUser } from '../redux/selectors';
import { PATH } from './constant.config';

// Page not found
const NotFound = lazy(() => import('../pages/not-found/NotFound'));
// Authentication pages
const Authentication = lazy(() =>
    import('../pages/authentication/Authentication'),
);
// Home page
const Home = lazy(() => import('../pages/home/Home'));
// Profile pages
const Profile = lazy(() => import('../pages/profile/Profile'));
const Information = lazy(() =>
    import('../pages/profile/main/information/Information'),
);
const Password = lazy(() => import('../pages/profile/main/password/Password'));
const Address = lazy(() => import('../pages/profile/main/address/Address'));
const Credit = lazy(() => import('../pages/profile/main/credit/Credit'));
const ShoppingHistory = lazy(() =>
    import('../pages/profile/main/shopping-history/ShoppingHistory'),
);
const ShopRegister = lazy(() =>
    import('../pages/profile/main/shop-register/ShopRegister'),
);
const ShopList = lazy(() => import('../pages/profile/main/shop-list/ShopList'));
// Product pages
const Products = lazy(() => import('../pages/products/Products'));
const ProductDetail = lazy(() =>
    import('../pages/product-detail/ProductDetail'),
);
// Cart page
const Cart = lazy(() => import('../pages/cart/Cart'));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default function Router() {
    const user = useSelector(getUser);
    const router = createBrowserRouter([
        { path: PATH.auth, element: <Authentication /> },
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <Home /> },
                {
                    path: PATH.profile.index,
                    element: user ? <Profile /> : <Navigate to={`/${PATH.auth}`} />,
                    children: [
                        { index: true, element: <Information /> },
                        {
                            path: PATH.profile.password,
                            element: <Password />,
                        },
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
            ],
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]);
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<Loader />}>
                <RouterProvider router={router} />
            </Suspense>
        </QueryClientProvider>
    );
}
